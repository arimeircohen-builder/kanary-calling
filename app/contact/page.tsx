import type { Metadata } from "next";
import { PageShell } from "../components";
import ContactForm from "./contact-form";

export const metadata: Metadata = { title: "Book a Fit Call | Kanary Calling", description: "Tell Kanary Calling what you sell and who you need to reach. Start with a focused 20-minute fit conversation." };

export default function Contact() {
  return <PageShell>
    <section className="contact-page"><div className="contact-copy"><p className="eyebrow">Start here</p><h1>Let&apos;s see if Kanary can help.</h1><p>Tell Ari what you sell and who you are trying to reach. He will tell you whether cold calling makes sense and whether Kanary is the right partner.</p><div className="contact-notes"><span><strong>20 minutes</strong>Focused fit call</span><span><strong>No hard pitch</strong>Just a straight answer</span><span><strong>Founder-led</strong>You talk with Ari</span></div></div><div><ContactForm /></div></section>
  </PageShell>;
}
