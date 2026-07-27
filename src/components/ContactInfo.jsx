import React from "react";
import { useT } from "../i18n";
import { CONTACT } from "../config/siteConfig";

// Contact details block shown beside the form.
export default function ContactInfo() {
  const t = useT();
  const c = t.contact;
  return (
    <div className="contact-data">
      <div className="contact-info">
        <h2 id="request-title">{c.readyTitle}</h2>
        <span>{c.weSpeak}</span>
        <span>{c.byAppointment}</span>
        <span>{c.phoneLabel}: <a title={c.phoneLabel} href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a> {c.phoneHours}</span>
        <span>{c.emailLabel}: <a title={c.emailLabel} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></span>
      </div>
    </div>
  );
}
