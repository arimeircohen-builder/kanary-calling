import assert from "node:assert/strict";
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
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
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
