"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  if (sent) return <div className="form-success"><span>✓</span><h2>Your brief is ready.</h2><p>This preview does not send messages yet. Add your preferred email or scheduling link before launch to activate the handoff.</p><button className="text-link" onClick={() => setSent(false)}>Review your answers</button></div>;
  return <form className="contact-form" onSubmit={submit}>
    <label><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
    <label><span>Work email</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label>
    <label><span>Company</span><input name="company" required autoComplete="organization" placeholder="Company name" /></label>
    <label><span>Company website</span><input name="website" type="url" placeholder="https://" /></label>
    <label className="full"><span>What do you sell?</span><textarea name="offer" required rows={3} placeholder="A quick description is perfect." /></label>
    <label className="full"><span>Who are you trying to reach?</span><textarea name="buyers" required rows={3} placeholder="Companies, roles, or markets." /></label>
    <label className="full"><span>Anything else Ari should know?</span><textarea name="notes" rows={3} placeholder="Current motion, goals, or timing." /></label>
    <button className="button full" type="submit">Start the conversation <span aria-hidden="true">↗</span></button>
  </form>;
}
