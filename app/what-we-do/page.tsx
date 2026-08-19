import type { Metadata } from "next";
import { CtaBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "What We Do | Kanary Calling", description: "Targeting, messaging, cold calling, qualification, meeting creation, and market feedback for B2B teams." };

const work = [
  ["01", "Targeting", "Who should we call?", "We align on the accounts, roles, and buying signals that matter."],
  ["02", "Messaging", "Why should they care?", "We turn your offer into a clear reason to stay on the phone."],
  ["03", "Calling", "Start the conversation.", "Focused, consistent calls reach buyers that email alone misses."],
  ["04", "Qualification", "Is there an opportunity?", "We listen for relevance, interest, timing, pain, and fit."],
  ["05", "Meeting creation", "Get the right people together.", "Qualified prospects move to your sales team with useful context."],
  ["06", "Feedback", "What is the market saying?", "Every call makes the next message, target, and conversation sharper."],
];

export default function WhatWeDo() {
  return <PageShell>
    <PageHero eyebrow="What we do" title="Cold calling, without building another cold calling team."><p>Kanary handles the work between “we should call these accounts” and “we have someone interested.”</p></PageHero>
    <section className="detail-grid">{work.map(([n,title,q,text]) => <article key={n}><span>{n}</span><p className="detail-question">{q}</p><h2>{title}</h2><p>{text}</p></article>)}</section>
    <section className="deliverables-section"><div><p className="eyebrow">What you get</p><h2>Everything needed to turn a list into a learning outbound motion.</h2></div><ul><li>Dedicated outbound calling</li><li>Messaging and talk tracks</li><li>Objection handling</li><li>Prospect qualification</li><li>Meeting booking</li><li>Call notes and context</li><li>Market feedback</li><li>Ongoing message adjustments</li></ul></section>
    <section className="trust-section"><p className="eyebrow">What we are not</p><h2>We are not here to manufacture meetings.</h2><p>A meeting with someone who has no reason to buy is not pipeline. Kanary creates conversations with enough relevance, interest, or business pain to justify the next step.</p></section>
    <CtaBand />
  </PageShell>;
}
