# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-deck slide presentation for Ginza.js #11 — a 10-minute Japanese-language talk titled
「自分だけのGLaDOSをつくる」, about running a day out of one Markdown + Git + Claude Code repo and
reaching it from anywhere. It is not a slide *framework*; it is one specific talk built as a
Vite + React 19 SPA. All slide content lives in the repo as JSX, not in Markdown or a CMS.

The title is deliberately playful and the subtitle is load-bearing: it lists the three real
components so the audience does not arrive expecting a talking assistant. Keep them together
if you touch either.

The wording on the slides comes from an external script and is authoritative — adjust presentation,
not copy. The deck must also stay publishable: no employer names, ticket IDs, listener names, or
other private details belong in it.

## Commands

pnpm is the package manager (`pnpm-lock.yaml`).

```
pnpm install
pnpm dev       # Vite dev server — the presentation mode you actually present from
pnpm build     # tsc (typecheck, noEmit) && vite build → dist/
pnpm preview   # serve the built dist/
pnpm lint      # oxlint
pnpm lint:fix  # oxlint --fix
pnpm ogp       # regenerate public/ogp.png (see below)
```

There is no test runner or formatter configured; `pnpm lint` and `pnpm build` are the two
checks, and `.github/workflows/ci.yml` runs both on pull requests and on `main`. There is no
separate typecheck script because `build` already runs `tsc` — with `strict`, `noUnusedLocals`,
and `noUnusedParameters` on, so unused variables fail the build.

`.oxlintrc.json` disables two rules, each with the reasoning inline: JSX uses the automatic
runtime, and `main.tsx` imports `styles.css` for its side effect.

## Architecture

Three files carry the whole deck:

- `src/sections.tsx` — the **content**. Exports `sections: Section[]`, where each entry is
  `{ id: string, content: ReactNode, note: string }`. Array order *is* slide order — the `id`
  is only React's key and plays no part in navigation, so it must be unique but is safe to
  rename. Adding, removing, or reordering an entry changes the deck; a new entry needs a new
  `id`, or React will collide keys.
- `src/App.tsx` — the **runtime**. Maps `sections` to `<section class="slide">` elements and
  wires up all navigation behavior. Holds the only state in the app: `activeIndex`, `dark`,
  `showNotes`.
- `src/styles.css` — the **presentation layer**. Scroll-snap layout, theme via CSS custom
  properties, print rules.

### How navigation works

Slides are real scroll positions, not a router. `html { scroll-snap-type: y mandatory }` plus
`.slide { height: 100svh }` makes each section a snap target; everything else observes that scroll:

- An `IntersectionObserver` (threshold 0.5) sets `activeIndex`, toggles `.visible` on
  `.slide-inner` for the fade-in, and mirrors the position into the URL hash via
  `history.replaceState` as a **1-based** index (`#1` is the first slide).
- Deep-linking reads that hash on mount and scrolls with `behavior: "instant"`; all other
  navigation uses `behavior: "smooth"`.
- Keyboard: arrows / Space move by one, Home / End jump to the ends, `d` toggles dark/light,
  `n` toggles the speaker-notes overlay.

Because the observer owns `activeIndex`, never set it directly — call `scrollTo(index)` and let
the scroll drive the state. Keep the 1-based hash convention if you touch either the mount
effect or the observer; they must agree.

### Themes and print

`.dark` / `.light` on the root `.deck` div swap a block of CSS custom properties (`--bg`,
`--fg`, `--fg-sub`, …). Style new slide elements against those variables rather than literal
colors, or they will break in one of the two themes. The `@media print` block converts the deck
into a paginated PDF export (one slide per page, animations forced visible, chrome hidden) —
check it when adding fixed-position or animated elements.

## Working on slide content

The `note` field is not decoration. It carries the presenter's live script: wall-clock timings
for a 10-minute slot (`0:30–2:00`), contingency instructions, and an explicit cut order
(【削る順①】…) marking which slides get dropped if the talk runs long. Preserve that information
when editing a note.

The demo is the spine and keeps its 90 seconds no matter what. After it, the technical middle runs
skills → どこからでも → 判断はLLM → the three-slide handoff story, and the closing loses its back
half by plan. 「この運用から生まれたもの」 is not cut, but is held to 30 seconds. The times in the
notes are a closed schedule that ends at 10:00, so moving one slide's allocation means finding the
seconds somewhere else — that is why adding a slide has repeatedly meant compressing a neighbour.

Content is Japanese. `index.html` sets `lang="ja"` and the font stack in `styles.css` includes
CJK families — keep both in place. Notes use `–`/`—` escapes for en/em dashes; matching
that is optional but consistent.

Slides are deliberately near-empty — most are a single `<h1>`. Existing content classes
(`.subtitle`, `.sub`, `.flow`, `.links`, `.link-heading`, and `.avatar` / `.intro-name` on the
self-intro slide) cover the current needs; prefer reusing one over adding a new rule.

The intro slide's portrait is the deck's only image. It lives in `src/assets/` and is **imported**
by `sections.tsx` rather than served from `public/`: an import lets Vite fingerprint it and emit a
relative URL, which is what keeps it resolving under the project path that `base: "./"` targets. A
`public/` file referenced as `/naturalclar.jpg` would 404 on the deployed site. Hot-linking the
avatar from github.com would break the deck's offline guarantee, so the file is committed.

## Deployment

`.github/workflows/deploy.yml` builds on pushes to `main` and publishes `dist/`
to GitHub Pages. The deck is served at:

**https://naturalclar.dev/slides-ginza-js-2026-08/**

That URL is not configured anywhere in this repo, and the path is not free to
choose. `Naturalclar/naturalclar.github.io` is the account's *user site* and its
`CNAME` is `naturalclar.dev`, so GitHub Pages serves every project page under
the account at `naturalclar.dev/<repo-name>/` — exactly one path segment, always
equal to the repo name. Renaming this repo changes the URL; nesting it under
something like `/slides/…` is not possible from a project repo at all.

`vite.config.ts` sets `base: "./"` rather than the literal path, so the build
stays correct under `pnpm preview` and survives a repo rename.

## OGP image

`public/ogp.png` is a screenshot of the deck's own landing slide, generated by
`scripts/generate-ogp.mjs` (`pnpm ogp`). The script builds, serves `dist/`, and
screenshots slide 1 at 1200×630 with Playwright, so the card can never drift
from the deck — but it is a committed artifact, so **re-run `pnpm ogp` after
editing slide 1 or the theme**, or the card will show the old title.

The capture hides `.dots` and `.scroll-hint`, matching what `@media print`
already hides: both are navigation affordances rather than slide content, and
the arrow collides with the subtitle at this aspect ratio.

Two things affect the output beyond the deck itself:

- **Fonts.** The deck uses a system font stack with no webfont, so the rendered
  glyphs are whatever the generating machine has. On macOS that is Hiragino
  Sans; on a Linux box without it the fallback is a different gothic. The image
  is best regenerated on the machine whose rendering you want shipped.
- **Chromium.** Sandboxed environments ship a prebuilt Chromium that
  Playwright's own resolver may not find. Set `PLAYWRIGHT_CHROMIUM_PATH` to that
  binary; elsewhere `pnpm exec playwright install` once is enough.

The `og:image:width` / `og:image:height` tags in `index.html` are hardcoded to
1200×630 and must be kept in step with the constants in the script.
