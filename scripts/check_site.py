#!/usr/bin/env python3
"""Quality gates for the built AquaFinders site (Python standard library only).

Usage:  hugo --gc --minify && python3 scripts/check_site.py [public_dir]
Writes reports/site-check.json and prints a summary. Exits 1 if any check fails.
"""
from __future__ import annotations

import json
import re
import sys
import tomllib
import xml.etree.ElementTree as ET
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public"
BASE = "https://aquafinders.site"
LANG_CODES = {"en": "en-US", "es": "es"}

# Claims the brief forbids, or facts the owner retired. Matched case-insensitively in visible text.
BANNED = [
    r"\bpinpoint", r"cutting[- ]edge", r"revolutionary", r"highest gpm", r"dramatically",
    r"\b600 (?:ft|feet|pies)", r"hundreds of (?:homeowners|clients)", r"cientos de propietarios",
    r"\$\s?1,?200", r"\$\s?725", r"nationwide", r"todo el país", r"exact aquifer",
    r"guaranteed (?:water|success|results|yield)", r"\bwe guarantee", r"\bgarantizamos",
]
SECRET_PATTERNS = [r"sk_live_[0-9a-zA-Z]+", r"AKIA[0-9A-Z]{16}", r"-----BEGIN [A-Z ]*PRIVATE KEY", r"ghp_[0-9A-Za-z]{30,}",
                   r"livereload", r"localhost:\d+"]
EN_STOP = set("the and of to with your you for that this is are be we our from can it not what when how will".split())
ES_STOP = set("el la los las de del y que con su sus para por es son un una no lo se en al qué cómo".split())
# Pages that are intentionally not localized yet (noindex) – reported, not failed.
KNOWN_UNTRANSLATED = {"/es/promo-request/"}
NO_CTA_REQUIRED = {"/privacy/", "/es/privacy/", "/sitemap/", "/es/sitemap/", "/request/", "/es/request/",
                   "/promo-request/", "/es/promo-request/"}


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.title = ""
        self.meta: dict[str, str] = {}
        self.links: list[dict] = []
        self.anchors: list[dict] = []
        self.imgs: list[dict] = []
        self.h1: list[str] = []
        self.jsonld: list[str] = []
        self.blocks: list[str] = []  # visible text blocks (p/li/h*/summary) inside <main>
        self.text: list[str] = []
        self._stack: list[str] = []
        self._in_title = self._in_h1 = self._in_jsonld = False
        self._skip = 0
        self._in_main = False
        self._block: list[str] | None = None
        self._h1buf: list[str] = []
        self._ld: list[str] = []

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key:
                self.meta[key] = a.get("content", "")
        elif tag == "link":
            self.links.append(a)
        elif tag == "a":
            self.anchors.append(a)
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "h1":
            self._in_h1 = True
            self._h1buf = []
        elif tag == "script":
            if a.get("type") == "application/ld+json":
                self._in_jsonld = True
                self._ld = []
            self._skip += 1
        elif tag in ("style", "noscript"):
            self._skip += 1
        elif tag == "main":
            self._in_main = True
        if tag in ("p", "li", "h1", "h2", "h3", "summary", "figcaption") and self._in_main:
            self._block = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag == "h1":
            self._in_h1 = False
            self.h1.append(" ".join("".join(self._h1buf).split()))
        elif tag == "script":
            if self._in_jsonld:
                self.jsonld.append("".join(self._ld))
                self._in_jsonld = False
            self._skip -= 1
        elif tag in ("style", "noscript"):
            self._skip -= 1
        elif tag == "main":
            self._in_main = False
        if tag in ("p", "li", "h1", "h2", "h3", "summary", "figcaption") and self._block is not None:
            txt = " ".join("".join(self._block).split())
            if txt:
                self.blocks.append(txt)
            self._block = None

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_jsonld:
            self._ld.append(data)
        if self._skip:
            return
        if self._in_h1:
            self._h1buf.append(data)
        if self._block is not None:
            self._block.append(data)
        self.text.append(data)


def url_path(p: Path) -> str:
    rel = p.relative_to(PUBLIC).as_posix()
    if rel.endswith("index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def load_redirects() -> list[dict]:
    try:
        return tomllib.loads((ROOT / "netlify.toml").read_text()).get("redirects", [])
    except FileNotFoundError:
        return []


def redirect_match(path: str, rules: list[dict]) -> dict | None:
    for r in rules:
        frm = r["from"]
        if frm.endswith("/*"):
            if path == frm[:-2] or path.startswith(frm[:-1]):
                return r
        elif path.rstrip("/") == frm.rstrip("/"):
            return r
    return None


def resolves(path: str, rules: list[dict]) -> bool:
    path = unquote(path.split("#")[0].split("?")[0]) or "/"
    target = PUBLIC / path.lstrip("/")
    if target.is_file() or (target / "index.html").is_file():
        return True
    r = redirect_match(path, rules)
    return bool(r and int(r.get("status", 301)) in (200, 301, 302))


def main() -> int:
    if not PUBLIC.is_dir():
        print(f"Build output not found: {PUBLIC}. Run `hugo --gc --minify` first.")
        return 2
    rules = load_redirects()
    redirect_sources = {r["from"] for r in rules if int(r.get("status", 301)) in (301, 302)}
    failures: list[dict] = []
    warnings: list[dict] = []
    pages: dict[str, Page] = {}

    def fail(check, path, msg):
        failures.append({"check": check, "page": path, "detail": msg})

    def warn(check, path, msg):
        warnings.append({"check": check, "page": path, "detail": msg})

    for f in sorted(PUBLIC.rglob("*.html")):
        p = Page()
        raw = f.read_text(encoding="utf-8")
        p.feed(raw)
        p.raw = raw  # type: ignore[attr-defined]
        pages[url_path(f)] = p

    def is_indexable(path, p):
        robots = p.meta.get("robots", "")
        return "noindex" not in robots and not path.endswith("404.html") and "http-equiv" not in p.raw[:400]

    indexable = {k: v for k, v in pages.items() if is_indexable(k, v)}
    titles, descs = defaultdict(list), defaultdict(list)

    for path, p in pages.items():
        lang = "es" if path.startswith("/es/") else "en"
        text = " ".join(" ".join(p.text).split())
        # 10. Secrets / dev artifacts in every generated file
        for pat in SECRET_PATTERNS:
            if re.search(pat, p.raw):
                fail("no_secrets_or_dev_artifacts", path, f"matched /{pat}/")
        if path not in indexable:
            continue
        # 1. Title / description / H1
        t = " ".join(p.title.split())
        d = p.meta.get("description", "").strip()
        if not t:
            fail("title", path, "empty <title>")
        if not d:
            fail("description", path, "empty meta description")
        titles[t].append(path)
        descs[d].append(path)
        if len(t) > 65:
            warn("title_length", path, f"{len(t)} chars: {t}")
        if not 70 <= len(d) <= 165:
            warn("description_length", path, f"{len(d)} chars")
        if len(p.h1) != 1:
            fail("one_h1", path, f"{len(p.h1)} <h1> elements: {p.h1}")
        # 2. Real content in the HTML (no JS needed)
        words = len(" ".join(p.blocks).split())
        if words < 60:
            fail("content_without_js", path, f"only {words} words of body text in <main>")
        if "enable JavaScript" in text:
            fail("content_without_js", path, "SPA placeholder text present")
        # 3. Canonical, lang, hreflang, JSON-LD
        canon = [l.get("href") for l in p.links if l.get("rel") == "canonical"]
        expected = BASE + path
        if canon != [expected]:
            fail("canonical", path, f"expected {expected}, got {canon}")
        if p.lang != LANG_CODES[lang]:
            fail("html_lang", path, f"expected {LANG_CODES[lang]}, got {p.lang}")
        for raw_ld in p.jsonld:
            try:
                data = json.loads(raw_ld)
            except json.JSONDecodeError as e:
                fail("jsonld_parse", path, str(e))
                continue
            blob = json.dumps(data).lower()
            if "aggregaterating" in blob or '"review"' in blob:
                fail("jsonld_no_ratings", path, "rating/review markup present")
        if not p.jsonld:
            fail("jsonld_present", path, "no JSON-LD")
        # 4. Internal links and assets resolve
        for a in p.anchors:
            href = a.get("href", "")
            if href.startswith(BASE):
                href = href[len(BASE):] or "/"
            if href.startswith("/") and not href.startswith("//"):
                if not resolves(href, rules):
                    fail("internal_links", path, f"broken link {href}")
                elif redirect_match(href.split("#")[0], rules) and href.split("#")[0] in redirect_sources:
                    warn("internal_links", path, f"links to redirect source {href}")
        for img in p.imgs:
            src = img.get("src", "")
            if src.startswith("/") and not resolves(src, rules):
                fail("images_exist", path, f"missing image {src}")
            # 9. Images sized and described
            if "alt" not in img:
                fail("image_alt", path, f"no alt on {src}")
            if not (img.get("width") and img.get("height")):
                fail("image_dimensions", path, f"no width/height on {src}")
        for l in p.links:
            if l.get("rel") == "stylesheet" and l.get("href", "").startswith("/") and not resolves(l["href"], rules):
                fail("assets_exist", path, f"missing stylesheet {l['href']}")
        # 7. Every page has a working CTA to the lead form
        if path not in NO_CTA_REQUIRED:
            req = "/es/request/" if lang == "es" else "/request/"
            if not any(a.get("href") == req and a.get("data-track") == "primary_cta_click" for a in p.anchors):
                fail("lead_cta", path, f"no tracked CTA to {req}")
        # 8. No English paragraphs on Spanish pages
        if lang == "es":
            for block in p.blocks:
                toks = re.findall(r"[a-záéíóúñü]+", block.lower())
                if len(toks) < 6:
                    continue
                en = sum(t in EN_STOP for t in toks) / len(toks)
                es = sum(t in ES_STOP for t in toks) / len(toks)
                if en > 0.18 and es < 0.08:
                    (warn if path in KNOWN_UNTRANSLATED else fail)("spanish_only", path, f"English-looking text: {block[:90]}")
        # Banned claims
        low = text.lower()
        for pat in BANNED:
            m = re.search(pat, low)
            if m:
                fail("banned_claims", path, f"'{m.group(0)}'")

    for t, ps in titles.items():
        if len(ps) > 1:
            fail("unique_title", ", ".join(ps), t)
    for d, ps in descs.items():
        if len(ps) > 1:
            fail("unique_description", ", ".join(ps), d)

    # 3b. hreflang reciprocity
    for path, p in indexable.items():
        alts = {l.get("hreflang"): l.get("href") for l in p.links if l.get("rel") == "alternate" and l.get("hreflang")}
        for code, href in alts.items():
            if code == "x-default":
                continue
            tpath = href[len(BASE):] if href.startswith(BASE) else href
            other = indexable.get(tpath)
            if other is None:
                fail("hreflang", path, f"{code} alternate {href} is not an indexable page")
                continue
            back = {l.get("href") for l in other.links if l.get("rel") == "alternate"}
            if BASE + path not in back:
                fail("hreflang_reciprocal", path, f"{tpath} does not link back")

    # 5. Sitemaps list only canonical, indexable, non-redirected URLs – and all of them
    listed: set[str] = set()
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for sm in [PUBLIC / "en" / "sitemap.xml", PUBLIC / "es" / "sitemap.xml"]:
        if not sm.exists():
            fail("sitemap", str(sm), "missing")
            continue
        for loc in ET.parse(sm).getroot().findall("s:url/s:loc", ns):
            u = loc.text.strip()
            listed.add(u)
            path = urlparse(u).path
            if path not in indexable:
                fail("sitemap_indexable", path, "listed in sitemap but missing or noindex")
            if redirect_match(path, rules) and int(redirect_match(path, rules).get("status", 301)) == 301:
                fail("sitemap_no_redirects", path, "listed in sitemap but redirected")
    for path in indexable:
        if BASE + path not in listed:
            warn("sitemap_complete", path, "indexable page not in sitemap")

    # robots.txt
    robots = (PUBLIC / "robots.txt").read_text() if (PUBLIC / "robots.txt").exists() else ""
    if "Disallow: /\n" in robots + "\n" or "Sitemap:" not in robots:
        fail("robots", "/robots.txt", robots.strip())

    # 404 pages exist
    for p404 in ["404.html", "es/404.html"]:
        if not (PUBLIC / p404).exists():
            fail("not_found_page", "/" + p404, "missing")

    # Placeholders still awaiting the owner (source of truth: content files)
    pending = []
    for f in sorted((ROOT / "content").rglob("*.md")):
        for m in re.finditer(r'\{\{<\s*verify\s+"([^"]+)"', f.read_text(encoding="utf-8")):
            pending.append({"file": str(f.relative_to(ROOT)), "text": m.group(1)})

    report = {
        "public_dir": str(PUBLIC),
        "pages_total": len(pages),
        "pages_indexable": len(indexable),
        "sitemap_urls": len(listed),
        "failures": failures,
        "warnings": warnings,
        "needs_owner_verification": pending,
        "passed": not failures,
    }
    out = ROOT / "reports"
    out.mkdir(exist_ok=True)
    (out / "site-check.json").write_text(json.dumps(report, indent=2, ensure_ascii=False))

    print(f"Pages: {len(pages)} built, {len(indexable)} indexable, {len(listed)} in sitemaps")
    print(f"Failures: {len(failures)}   Warnings: {len(warnings)}   Owner placeholders: {len(pending)}")
    for f in failures:
        print(f"  FAIL [{f['check']}] {f['page']}: {f['detail']}")
    for w in warnings:
        print(f"  warn [{w['check']}] {w['page']}: {w['detail']}")
    for p in pending:
        print(f"  NEEDS_OWNER_VERIFICATION {p['file']}: {p['text']}")
    print("Report: reports/site-check.json")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
