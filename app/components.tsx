import Link from "next/link";

export function Logo() {
  return (
    <span className="brand">
      <span className="brand-signal" aria-hidden="true"><span>K</span></span>
      <span>KANARY<span>CALLING</span></span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" aria-label="Kanary Calling home"><Logo /></Link>
      <nav aria-label="Main navigation">
        <Link href="/what-we-do">What we do</Link>
        <Link href="/who-we-help">Who we help</Link>
        <Link href="/about">About</Link>
        <Link href="/faq">FAQ</Link>
        <Link className="button button-small" href="/contact">Book a fit call</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><Link href="/"><Logo /></Link><p>Focused cold calling for B2B teams.</p></div>
      <div className="footer-links">
        <div><strong>Explore</strong><Link href="/what-we-do">What we do</Link><Link href="/who-we-help">Who we help</Link><Link href="/about">About</Link></div>
        <div><strong>Connect</strong><Link href="/contact">Book a fit call</Link><Link href="/faq">FAQ</Link></div>
        <div><strong>Legal</strong><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Kanary Calling</span><span>Make the call. Find the signal.</span></div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>;
}

export function SignalArt() {
  return (
    <div className="signal-stage" aria-label="A canary signal representing focused cold calling">
      <div className="signal-ring ring-one" />
      <div className="signal-ring ring-two" />
      <div className="signal-core">
        <span className="signal-k">K</span>
        <div className="microphone" aria-hidden="true"><i /><b /></div>
      </div>
      <div className="signal-label"><span>LIVE SIGNAL</span><strong>Call connected</strong></div>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <p className="eyebrow">Ready when you are</p>
      <h2>Have good accounts but not enough conversations?</h2>
      <p>Tell us what you sell and who you want to reach. We will tell you if cold calling makes sense.</p>
      <Link className="button button-dark" href="/contact">Book a 20-minute fit call <span aria-hidden="true">↗</span></Link>
      <small>No pitch deck marathon. No complicated onboarding talk.</small>
    </section>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="page-lede">{children}</div>
    </section>
  );
}
