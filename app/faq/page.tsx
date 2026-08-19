import type { Metadata } from "next";
import { CtaBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "FAQ | Kanary Calling", description: "Answers about Kanary Calling, fractional cold calling, qualification, pricing, software, and getting started." };

const faqs = [
  ["What exactly does Kanary Calling do?", "We call prospects for B2B companies, qualify potential opportunities, and help create sales conversations."],
  ["Is Kanary an appointment-setting agency?", "Not in the traditional sense. The goal is not the largest number of meetings. It is qualified conversations with a real reason to happen."],
  ["What does fractional mean?", "You get an experienced outbound sales resource without hiring another full-time employee."],
  ["Who makes the calls?", "Ari does. Founder-led execution keeps the person learning from the market close to your strategy."],
  ["What industries do you work with?", "Kanary focuses on B2B software and services with a clear buyer, a defined problem, and enough contract value to support thoughtful outbound."],
  ["How quickly can we start?", "First we confirm fit, targets, messaging, and handoff criteria. A realistic start plan comes out of the initial fit call."],
  ["How is pricing structured?", "Engagements are scoped around your market, call volume, sales motion, and the level of support required. We discuss pricing during the fit call."],
  ["Do I need special software?", "Probably not. Kanary can work within an agreed sales stack and workflow."],
  ["Do you guarantee meetings?", "No legitimate outbound partner can guarantee a prospect will meet. We guarantee disciplined execution, transparent communication, and consistent effort."],
];

export default function Faq() {
  return <PageShell>
    <PageHero eyebrow="FAQ" title="Good questions deserve straight answers."><p>Everything you need to know before deciding whether Kanary fits your outbound motion.</p></PageHero>
    <section className="faq-list">{faqs.map(([q,a],i) => <details key={q} open={i===0}><summary><span>0{i+1}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</section>
    <CtaBand />
  </PageShell>;
}
