// Generates public/ogp.png by screenshotting the deck's landing slide.
//
// The card is just slide 1 as the audience first sees it, so the image never
// drifts from the deck: re-run this after changing the title slide.
//
// Run via `pnpm ogp`, which builds first — this serves dist/, not the dev
// server, so what gets captured is what actually ships.

import { readFileSync } from "node:fs";
import { preview } from "vite";
import { chromium } from "playwright";

const OUT = "public/ogp.png";
const WIDTH = 1200;
const HEIGHT = 630;

// Keep in sync with the og:image:width / og:image:height meta tags in
// index.html — crawlers trust those values over the file itself.

const server = await preview({ preview: { port: 4173, open: false } });
const url = server.resolvedUrls.local[0];

// The sandboxed CI-style images ship a prebuilt Chromium that Playwright's
// own resolver may not find; fall back to it explicitly.
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
});

try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
  });

  await page.goto(url, { waitUntil: "load" });

  // Hide the same chrome the deck already hides when printing: the dot nav
  // and the scroll hint are navigation affordances, not part of the slide,
  // and in a 1200x630 crop the arrow collides with the subtitle.
  await page.addStyleTag({
    content: ".dots, .scroll-hint { display: none !important; }",
  });

  // The deck fades each slide in via IntersectionObserver adding .visible.
  // Screenshotting before that lands would capture an empty frame.
  await page.waitForSelector(".slide-inner.visible", { timeout: 10_000 });
  await page.waitForFunction(() => document.fonts.ready.then(() => true));

  // .slide-inner transitions opacity/transform over 0.8s.
  await page.waitForTimeout(1200);

  await page.screenshot({ path: OUT });

  const bytes = readFileSync(OUT).length;
  console.log(`wrote ${OUT} (${WIDTH}x${HEIGHT}, ${(bytes / 1024).toFixed(1)} kB)`);
} finally {
  await browser.close();
  await server.httpServer.close();
}
