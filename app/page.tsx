import Link from "next/link";
import { CtaBand, SignalArt, SiteFooter, SiteHeader } from "./components";

const services = [
  ["01", "Target the right people", "We align on the companies, roles, and problems worth pursuing."],
  ["02", "Build the message", "We turn your value proposition into a conversation prospects understand fast."],
  ["03", "Pick up the phone", "Kanary handles focused, consistent calling into your target market."],
  ["04", "Qualify interest", "Not every conversation deserves a meeting. We find the ones that do."],
  ["05", "Book the conversation", "Qualified prospects connect directly with your sales team."],
  ["06", "Bring back feedback", "Learn what buyers care about, reject, and want to explore."],
];

const fits = [
  ["B2B software", "You have a defined market and need more conversations inside it."],
  ["Founder-led sales", "You can close. You need more qualified people to talk to."],
  ["Growing sales teams", "Your AEs need pipeline, but another full-time SDR is not the answer yet."],
  ["Outbound testing", "You want proof before building an internal calling team."],
];

export default function Home() {
  return (
    <><SiteHeader /><main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Fractional B2B cold calling</p>
          <h1>Turn cold accounts into <span>real conversations.</span></h1>
          <p className="hero-lede">Kanary Calling helps B2B companies reach the right prospects, start qualified conversations, and create sales opportunities through focused cold calling.</p>
          <p className="hero-punch">No giant SDR team. No spray-and-pray outreach. Just experienced outbound execution.</p>
          <div className="hero-actions">
            <Link className="button" href="/contact">See if we&apos;re a fit <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></Link>
          </div>
          <p className="proof-line"><span aria-hidden="true">●</span> Founder-led. Hands-on. Built for B2B.</p>
        </div>
        <SignalArt />
      </section>

      <section className="three-beats">
        <article><span>01</span><h2>You know who you want to reach.</h2><p>Tell us what you sell, the problem it solves, and who it is for.</p></article>
        <article><span>02</span><h2>We reach out to them.</h2><p>Kanary builds the list, calls, qualifies, and follows up.</p></article>
        <article><span>03</span><h2>Your team sells.</h2><p>Qualified opportunities go to the people who can close them.</p></article>
      </section>

      <section className="section problem-section">
        <div className="section-kicker"><span>THE PROBLEM</span><span>01 / 05</span></div>
        <div className="split-heading"><h2>Your buyers are not waiting for another email.</h2><div><p>Inbox competition is brutal. Good prospects ignore sequences every day.</p><p>Sometimes the fastest way to find out if there is an opportunity is simpler: <strong>call them.</strong></p></div></div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-kicker"><span>WHAT WE DO</span><span>02 / 05</span></div>
        <div className="section-title-row"><div><p className="eyebrow">Focused execution</p><h2>We make the calls your pipeline depends on.</h2></div><Link className="text-link" href="/what-we-do">See exactly what we do ↗</Link></div>
        <div className="service-grid">{services.map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="comparison-section">
        <div className="comparison-intro"><p className="eyebrow">The Kanary difference</p><h2>Not another lead generation agency.</h2><p>The goal is not to fill your calendar with strangers. It is to create conversations your sales team actually wants.</p></div>
        <div className="comparison-table">
          <div className="table-head"><span>Typical lead gen</span><span>Kanary Calling</span></div>
          {[["High-volume outreach","Focused outbound"],["Generic scripts","Client-specific messaging"],["Junior outsourced reps","Founder-led execution"],["Meetings at any cost","Qualified conversations"],["Activity reports","Actual market feedback"],["Black-box process","Direct communication"]].map(([a,b]) => <div className="table-row" key={a}><span>{a}</span><strong>{b}<i>✓</i></strong></div>)}
        </div>
      </section>

      <section className="section fit-section" id="fit">
        <div className="section-kicker"><span>WHO WE HELP</span><span>03 / 05</span></div>
        <div className="split-heading"><h2>Built for B2B teams that need more conversations.</h2><p>Kanary works best when you already have something worth selling and know roughly who should buy it.</p></div>
        <div className="fit-grid">{fits.map(([title,text], i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="not-fit"><strong>Kanary may not be right for you if</strong><ul><li>You sell mainly to consumers.</li><li>You are still defining your offer.</li><li>You want hundreds of low-quality meetings.</li><li>You expect outbound to fix a weak product.</li></ul></div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="section-kicker"><span>HOW IT WORKS</span><span>04 / 05</span></div>
        <div className="section-title-row"><div><p className="eyebrow">Simple by design</p><h2>From target account to sales conversation.</h2></div><Link className="button button-outline" href="/contact">Talk through your motion ↗</Link></div>
        <ol className="process-list">
          <li><span>01</span><h3>Align</h3><p>We learn what you sell, who buys it, why they care, and where outbound fits.</p></li>
          <li><span>02</span><h3>Prepare</h3><p>We define targets, messaging, qualification criteria, and the calling approach.</p></li>
          <li><span>03</span><h3>Call</h3><p>Kanary begins outbound execution and learns from the market in real time.</p></li>
          <li><span>04</span><h3>Hand off</h3><p>Qualified opportunities move to your team with the context needed to continue.</p></li>
        </ol>
      </section>

      <section className="founder-section">
        <div className="founder-visual"><img className="founder-headshot" src="/ari-cohen-headshot-v2.jpg" alt="Ari Cohen, founder of Kanary Calling" /><p><strong>ARI COHEN</strong><span>Founder, Kanary Calling</span></p></div>
        <div className="founder-copy"><p className="eyebrow">Founder-led execution</p><h2>Your caller should know how to sell.</h2><p>Cold calling works better when the person making the call understands sales. Not just the script. Not just the dialer. The buyer, the objection, and the reason the conversation should continue.</p><Link className="text-link" href="/about">Meet Ari ↗</Link></div>
      </section>

      <section className="fractional-section">
        <div className="fractional-word">FRACTIONAL</div><div><h2>What does “fractional” mean?</h2><p>You get experienced outbound sales capacity without hiring another full-time employee.</p><p>Think less “outsourced call center.” Think more “outbound rep plugged into your team.”</p></div>
      </section>

      <CtaBand />
    </main><SiteFooter /></>
  );
}
