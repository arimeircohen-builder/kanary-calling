import type { Metadata } from "next";
import { PageShell } from "../components";
import ContactForm from "./contact-form";

export const metadata: Metadata = { title: "Book a Fit Call | Kanary Calling", description: "Share your contact details to start a focused 20-minute fit conversation with Kanary Calling." };

export default function Contact() {
  return <PageShell>
    <section className="contact-page"><div className="contact-copy"><p className="eyebrow">Start here</p><h1>Let&apos;s see if Kanary can help.</h1><p>Leave your contact details and Ari will follow up directly in 12-24 hours. Add any context that would be useful, or keep it simple.</p><div className="contact-notes"><span><strong>20 minutes</strong>Focused fit call</span><span><strong>No hard pitch</strong>Just a straight answer</span><span><strong>Founder-led</strong>You talk with Ari</span></div></div><div><ContactForm /></div></section>
  </PageShell>;
}
