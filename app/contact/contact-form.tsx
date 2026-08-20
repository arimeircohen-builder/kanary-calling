"use client";

import { FormEvent, useState } from "react";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/ari@kanarycalling.com";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [validationError, setValidationError] = useState<"name" | "company" | "both" | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const name = String(fields.name ?? "").trim();
    const company = String(fields.company ?? "").trim();

    if (!name || !company) {
      setValidationError(!name && !company ? "both" : !name ? "name" : "company");
      setStatus("idle");
      return;
    }

    setValidationError(null);
    setStatus("submitting");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fields,
          _replyto: fields.email,
          _subject: `${name} - ${company} Kanary Calling Website Form Inquiry`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false || result?.success === "false") {
        throw new Error("Submission failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <div className="form-success" role="status"><span>✓</span><h2>Thanks — your note is on its way.</h2><p>Ari will review your details and follow up with you directly.</p><button className="text-link" onClick={() => setStatus("idle")}>Send another message</button></div>;

  return <form className="contact-form" action="https://formsubmit.co/ari@kanarycalling.com" method="POST" onSubmit={submit} aria-busy={status === "submitting"}>
    <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <label><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" aria-invalid={validationError === "name" || validationError === "both"} aria-describedby={validationError === "name" || validationError === "both" ? "contact-validation-error" : undefined} onInput={() => setValidationError(null)} /></label>
    <label><span>Company name</span><input name="company" required autoComplete="organization" placeholder="Your company" aria-invalid={validationError === "company" || validationError === "both"} aria-describedby={validationError === "company" || validationError === "both" ? "contact-validation-error" : undefined} onInput={() => setValidationError(null)} /></label>
    <label><span>Work email</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
    <label><span>Phone number</span><input name="phone" type="tel" required autoComplete="tel" placeholder="(555) 555-5555" /></label>
    <label className="full"><span>Anything else Ari should know? <em>(Optional)</em></span><textarea name="notes" rows={5} placeholder="Share anything that would be useful before the call—what you sell, who you want to reach, goals, or timing." /></label>
    {validationError && <p id="contact-validation-error" className="form-error full" role="alert">Please enter {validationError === "both" ? "your name and company name" : validationError === "name" ? "your name" : "your company name"}.</p>}
    {status === "error" && <p className="form-error full" role="alert">We couldn&apos;t send your message. Please check your connection and try again.</p>}
    <button className="button full" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Start the conversation"} <span aria-hidden="true">↗</span></button>
  </form>;
}
