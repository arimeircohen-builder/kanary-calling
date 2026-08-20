import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Kanary Calling homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Kanary Calling \| Fractional B2B Cold Calling/i);
  assert.match(html, /Turn cold accounts into/);
  assert.match(html, /Founder-led\. Hands-on\. Built for B2B\./);
  assert.match(html, /You know who you want to reach\./);
  assert.match(html, /Tell us what you sell, the problem it solves, and who it is for\./);
  assert.match(html, /We reach out to them\./);
  assert.match(html, /Kanary builds the list, calls, qualifies, and follows up\./);
  assert.doesNotMatch(html, /You have the accounts\./);
  assert.match(html, /\/kanary-logo\.png/);
  assert.match(html, /\/ari-cohen-headshot-v2\.jpg/);
  assert.match(html, /<details class="mobile-navigation">/);
  assert.match(html, /aria-label="Mobile navigation"/);
  assert.match(html, /rel="icon" href="\/kanary-logo-full\.png"/);
  assert.match(html, /og-social-v3\.jpg/);
  assert.match(html, /og:image:width" content="1200"/);
  assert.match(html, /og:image:height" content="630"/);
  assert.doesNotMatch(html, /\/og\.png/);
  assert.doesNotMatch(html, /favicon\.svg/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /href="\/roi"/i);
});

test("renders key marketing routes", async () => {
  const routes = [
    ["/what-we-do", /Cold calling, without building another cold calling team/],
    ["/who-we-help", /Outbound works better when the market is clear/],
    ["/about", /Cold calling deserves better than a script and a dialer/],
    ["/faq", /Good questions deserve straight answers/],
    ["/contact", /Let&apos;s see if Kanary can help|Let&#x27;s see if Kanary can help/],
  ];

  for (const [path, expected] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});

test("renders Ari and Kanary artwork on the about page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /\/ari-cohen-headshot-v2\.jpg/);
  assert.match(html, /\/kanary-logo\.png/);
  assert.doesNotMatch(html, />AC</);
});

test("contact form is wired to email Ari", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /formsubmit\.co\/ari@kanarycalling\.com/i);
  assert.match(html, /<input(?=[^>]*name="name")(?=[^>]*required)[^>]*>/i);
  assert.match(html, /<input(?=[^>]*name="company")(?=[^>]*required)[^>]*>/i);
  assert.match(html, /<input(?=[^>]*name="email")(?=[^>]*type="email")(?=[^>]*required)[^>]*>/i);
  assert.match(html, /<input(?=[^>]*name="phone")(?=[^>]*type="tel")(?=[^>]*required)[^>]*>/i);
  assert.match(html, /<textarea(?=[^>]*name="notes")(?![^>]*required)[^>]*>/i);
  assert.doesNotMatch(html, /name="(?:website|offer|buyers)"/i);
  assert.doesNotMatch(html, /preview does not send messages/i);
});

test("contact inquiries use the submitter and company in the email subject", async () => {
  const source = await readFile(new URL("../app/contact/contact-form.tsx", import.meta.url), "utf8");

  assert.match(source, /_subject:\s*`\$\{name\} - \$\{company\} Kanary Calling Website Form Inquiry`/);
  assert.match(source, /if \(!name \|\| !company\)[\s\S]*?setStatus\("idle"\);[\s\S]*?return;/);
  assert.match(source, /role="alert"/);
});

test("ROI calculator remains directly available but unlisted", async () => {
  const response = await render("/roi");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Do the sales math\./i);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
  assert.doesNotMatch(html, /href="\/roi"/i);
});
