# Lead handling, pipeline and measurement

## 1. Where leads arrive
- **Property review form** (`/request/`, `/es/request/`): an email from Web3Forms to the inbox tied to the access key. The subject has the form `New property review request [AF-YYMMDD-XXXX]`.
  Fields: name, email/phone, property_location, property_state, project_type, acres, timeframe, existing well depth/yield, preferred_contact, message, language, submitted_from, landing_page, referrer, first_seen, utm_*, gclid.
- **Contact form** (`/contact/`) and **promo form** (`/promo-request/`): also Web3Forms email.
- **Phone, WhatsApp and email clicks** are tracked as GA4 events only. A click is not a lead.

> Test the forms end to end on a Netlify deploy preview before launch: submit one test lead per form, confirm the email arrives, and confirm the success page shows the reference.

## 2. CRM (start simple: one Google Sheet)
Suggested columns:

`reference | received_at | name | email | phone | preferred_contact | language | state | county/location | project_type | acres | timeframe | existing_well | source (utm_source / referrer) | landing_page | campaign | stage | next_action_date | owner | proposal_sent_at | phase1_paid_at | phase2_paid_at | revenue | est_gross_margin | lost_reason | review_requested_at | referral_from | notes`

### Pipeline stages
New Inquiry → Contacted → Qualified → Proposal Sent → Won/Deposit (Phase 1) → Phase 1 Complete → Phase 2 Eligible → Phase 2 Won → Completed → Review/Referral Requested

**Not Qualified / Lost.** Always record a reason: out of area · survey not useful (e.g. equipment problem, not location) · price objection · no response · chose competitor · timing not right.

## 3. Follow-up cadence (owner to confirm; don't publish response times on the site until they're consistently met)
1. **Immediately:** the automatic acknowledgment (success page) is already in place.
2. **Same or next business day:** personal outreach by the preferred contact method.
3. **About 2 days later, if no answer:** one polite follow-up.
4. **About 7 days later:** a final follow-up, then mark the lead *Lost: no response*.

Honor opt-out requests immediately and note them in the sheet. Only text people who gave a phone number and chose "text".

## 4. GA4 events implemented
| Event | Fires when |
|---|---|
| `primary_cta_click` | Any "Check My Property" / "Request a Property Review" button (`label` = header, hero, mobile_bar, page_header, cta_band, inline…) |
| `view_sample_report` | Hero secondary button ("See what you receive") |
| `pricing_view` | Pricing page load, or "See pricing" button |
| `form_start` | First focus inside any form |
| `qualified_inquiry_submit` | Success page after a property review submission (once per reference) |
| `contact_form_submit` | Success page after a contact or promo form |
| `phone_click` / `whatsapp_click` | Any tel: or WhatsApp link |

`proposal_sent`, `phase1_won` and `phase2_won` happen offline: record them in the CRM sheet. Upload them as offline conversions only if Google Ads is used later.

In GA4, mark `qualified_inquiry_submit` as a **key event**. Don't mark clicks as conversions.

## 5. Weekly scoreboard (baseline: unknown until measured)
- Organic clicks by non-brand query and landing page (Search Console)
- Sessions → `form_start` → `qualified_inquiry_submit` rate
- Qualified leads, contact rate, proposal rate, close rate (from the sheet)
- Phase 1 → Phase 2 uptake; average revenue per project; estimated gross margin
- Cost per qualified lead and per won project, by channel (when paid channels start)
- Referrals per completed project

## 6. Search Console and Google Business Profile (owner actions)
1. After the DNS cutover to Netlify, verify the domain property in Search Console. Submit `https://aquafinders.site/sitemap.xml`.
2. Run URL Inspection on `/`, `/find-water/`, `/pricing/`, `/es/` and `/es/find-water/`. Check the live test shows the page content, not a blank app shell.
3. Request indexing for the home page and the P0 pages.
4. Watch Page indexing reports for *Page with redirect* (expected for `/process/`) and *Not found* errors.
5. Google Business Profile: confirm the category (e.g. a geological or environmental service), phone (732) 221-1202, website and service areas (states or regions). Because clients aren't received at the office, hide the address (service-area business rules). Use real field photos, request reviews only from genuine clients, offer no incentives and don't filter who gets asked.
