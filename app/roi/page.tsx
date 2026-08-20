import type { Metadata } from "next";
import { PageHero, PageShell } from "../components";
import { RoiCalculator } from "./roi-calculator";

const title = "Sales ROI Calculator | Kanary Calling";
const description = "Compare the true cost of an in-house SDR team with founder-led fractional cold calling using your own assumptions.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [] },
  twitter: { title, description, images: [] },
};

export default function RoiPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Sales ROI calculator" title="Do the sales math.">
        Compare the true cost of building an SDR team with experienced, founder-led outbound. Start with the assumptions below, then make every number yours.
      </PageHero>
      <RoiCalculator />
    </PageShell>
  );
}
