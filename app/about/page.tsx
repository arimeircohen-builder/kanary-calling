import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "About | Kanary Calling", description: "Meet Ari Cohen and learn why Kanary Calling brings founder-led sales experience to focused B2B cold calling." };

export default function About() {
  return <PageShell>
    <PageHero eyebrow="About Kanary" title="Cold calling deserves better than a script and a dialer."><p>Great outbound is not about making the most noise. It is about reaching the right person, with the right reason, and earning another minute of attention.</p></PageHero>
    <section className="about-intro"><div><p className="eyebrow">Who we are</p><h2>Small by design. Close to the work. Focused on execution.</h2></div><p>Kanary Calling is a founder-led B2B cold calling business built to help companies create qualified sales conversations.</p></section>
    <section className="ari-section"><div className="ari-portrait"><img src="/ari-cohen-headshot-v2.jpg" alt="Ari Cohen, founder of Kanary Calling" /><small>FOUNDER / OPERATOR</small></div><div><p className="eyebrow">Meet Ari</p><h2>I built Kanary around the part of sales I know best.</h2><p>I&apos;m Ari Cohen, founder of Kanary Calling. I have spent my career in outbound sales learning how to turn a cold account into a real conversation.</p><p>I built Kanary for companies that need more of those conversations but do not need another full-time salesperson.</p><div className="ari-manifesto"><span>Understand the business.</span><span>Understand the buyer.</span><span>Pick up the phone.</span><span>Find the opportunity.</span></div><Link className="button" href="/contact">Start a conversation ↗</Link></div></section>
    <section className="why-kanary"><div className="why-mark"><img src="/kanary-logo.png" alt="" /></div><div><p className="eyebrow">The signal in the name</p><h2>Why the canary?</h2><p>Historically, canaries were signals. Kanary Calling is built around the same idea.</p><p>Every cold call gives you one: interested, wrong person, wrong timing, real pain, or real opportunity.</p><p><strong>Our job is to find the signals worth acting on.</strong></p></div></section>
    <CtaBand />
  </PageShell>;
}
