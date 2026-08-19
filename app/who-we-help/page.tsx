import type { Metadata } from "next";
import { CtaBand, PageHero, PageShell } from "../components";

export const metadata: Metadata = { title: "Who We Help | Kanary Calling", description: "Fractional cold calling for B2B software, services, founder-led sales, and growing sales teams." };

const audiences = [
  ["B2B software", "Clear buyer. Meaningful contract value. A defined business problem."],
  ["B2B services", "Complex work that benefits from a direct, credible conversation."],
  ["Early growth companies", "Enough product-market fit to sell, without a full outbound team."],
  ["Founder-led sales", "Founders who can close but cannot spend all day prospecting."],
  ["AE-led organizations", "Experienced closers whose time is better spent selling than dialing."],
  ["Outbound experiments", "Teams that want to test calling before making another hire."],
];

export default function WhoWeHelp() {
  return <PageShell>
    <PageHero eyebrow="Who we help" title="Outbound works better when the market is clear."><p>Kanary is built for B2B companies that know what they sell and need help getting in front of more of the right buyers.</p></PageHero>
    <section className="audience-section"><div className="section-title-row"><div><p className="eyebrow">Strong fit</p><h2>Clear offer. Clear market. More calls needed.</h2></div></div><div className="audience-grid">{audiences.map(([title,text],i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="signals-section"><div><p className="eyebrow">Good signals</p><h2>Kanary could help if...</h2></div><ul><li>You have a list of companies you want to reach.</li><li>Your AEs need more pipeline.</li><li>Email is not creating enough conversations.</li><li>You want to test calling before another hire.</li><li>Your founder still owns most prospecting.</li><li>Your product sells once the right person engages.</li></ul></section>
    <section className="not-for-you"><p className="eyebrow">Honest qualification</p><h2>Kanary may not be right for you if...</h2><div><p>You sell mainly to consumers.</p><p>You are still figuring out your offer.</p><p>You need hundreds of low-quality meetings.</p><p>You expect outbound to fix a weak product.</p><p>You want someone to blast a list and disappear.</p></div></section>
    <CtaBand />
  </PageShell>;
}
