# Shruti Dhumne — portfolio

A single-page portfolio, set like an essay: warm paper, ink, one deep rust red, and a lot of air.

Motion is present but never announces itself — a 14px lift on scroll, an underline that grows from the left, a card that settles up a few pixels under the cursor. Nothing autoplays, nothing spins, nothing demands attention it hasn't earned.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

`npm run build` produces a fully static site in `out/`. There's no server — it's HTML, CSS, JS and self-hosted fonts.

## Deploy (Render)

[`render.yaml`](render.yaml) is a Render blueprint. It deploys as a **Static Site**:

| | |
|---|---|
| Build command | `npm ci && npm run build` |
| Publish directory | `out` |
| Node version | 22 (Next 16 needs ≥ 20.9) |

**To deploy:** on [Render](https://dashboard.render.com) → **New → Blueprint** → connect this repo. Render reads `render.yaml` and configures everything itself.

*(Or **New → Static Site** and enter the build command and publish directory by hand — same result.)*

Every push to `main` redeploys. The blueprint also sets security headers and immutable caching for hashed assets.

The same `out/` works unchanged on Netlify, GitHub Pages, Cloudflare Pages or S3 if you ever want to move.

---

## Structure

```
src/
  app/          layout, page, fonts, design tokens (globals.css)
  content/      resume.ts  ← the only source of facts
  components/   Nav, Reveal
  sections/     Hero · About · Work · Experience · Skills · Recognition · Contact
```

**Everything the page says about Shruti comes from `src/content/resume.ts`.** To change a fact, change it there — no copy is hard-coded in JSX.

## The rule the content is held to

**No fabricated facts.** Only claims traceable to the résumé appear on the page. No invented metrics, repo URLs, file paths, or dates. Where a codebase is private, the site says what was built and with what — it does not link to something that isn't there.

This matters because the site is sent to employers: an invented number is one you'd have to defend in an interview.

## Design tokens

| | |
|---|---|
| Paper | `#FAF9F7` — warm off-white, never pure white |
| Ink | `#1A1A1A` (15.8:1) · soft `#4A463F` · muted `#6F6A61` |
| Accent | `#A8402C` deep rust (6.4:1 on paper) |
| Display | Instrument Serif |
| Body | Inter |
| Meta | JetBrains Mono — dates, indices, stack labels only |

Fonts are self-hosted at build by `next/font`. **Zero external requests, zero cookies, zero storage.**

## Verified

Against the static export, not the dev server:

- **JavaScript disabled** → every section fully visible and readable (reveals are CSS-gated on a `js` class, so no-JS never hides content)
- **`prefers-reduced-motion`** → all motion off, nothing stuck invisible
- **390px** → no horizontal overflow, all touch targets ≥ 44px
- **Keyboard** → skip link visible on Tab, everything reachable
- **Contrast** → all 248 text nodes meet WCAG AA
- **0** external requests · **0** cookies · **0** localStorage/sessionStorage

## Things to add

Deliberately absent rather than invented — all one-line edits in `src/content/resume.ts`:

- A **GitHub URL** (not on the résumé, so the site doesn't fake one)
- A **résumé PDF** — drop it in `public/` and link it from the nav
- The **Automatic Ads live link** the résumé references

## Stack

Next.js 16 (App Router, static export) · React 19 · Tailwind v4 · TypeScript.
