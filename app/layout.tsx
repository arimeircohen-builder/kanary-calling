import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Kanary Calling | Fractional B2B Cold Calling";
  const description = "Focused, founder-led cold calling that turns B2B target accounts into qualified sales conversations.";
  return {
    title,
    description,
    icons: {
      icon: [{ url: "/kanary-logo-full.png", type: "image/png" }],
      shortcut: "/kanary-logo-full.png",
      apple: "/kanary-logo-full.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: origin,
      siteName: "Kanary Calling",
      images: [{
        url: `${origin}/og-social-v2.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Kanary Calling: Turn cold accounts into real conversations.",
      }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og-social-v2.jpg`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
