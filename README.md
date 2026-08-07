# IBima Assist — Corporate Website

The public marketing site for the claims platform built in this repo group. It explains the
products and services; it is **not** the product itself.

| | |
|---|---|
| This project | Marketing / corporate website — what we do, for whom, and how to get in touch |
| [`../car-damage-insurance-web-app`](../car-damage-insurance-web-app) | The actual product — claim & pre-inspection capture flows, admin console, intimation management |
| [`../car_damage_insurance_app`](../car_damage_insurance_app) | The native Flutter surveyor app |
| [`../ai-damage-assessment-service`](../ai-damage-assessment-service) | YOLO11-seg damage detection + cost engine + ILA narration |

Every claim made on this website maps to something that exists in one of those three projects —
see [Where the content comes from](#where-the-content-comes-from) below.

## Getting started

```bash
npm install
npm run dev               # http://localhost:5174
npm run build             # -> dist/
npm run preview           # serve the built output
npm run smoke             # render every page server-side; fails on any runtime error
npm run audit:responsive  # after a build: load every page at 10 device widths
npm run audit:images      # after a build: fail if any section has no photograph
npm run report:images     # after a build: print which photo each section uses
```

`audit:responsive` runs against `dist/`, so build first. It drives the Chrome or Edge already
installed on the machine via `puppeteer-core` — no 300MB browser download. If neither is at a
standard path, add yours to `BROWSERS` at the top of `scripts/responsive-audit.mjs`.

Same stack as the product app so the two stay easy to move between: **Vite + React 19 +
Tailwind CSS v4 + Ant Design v6 + React Router v7**, plus **Lucide** for icons.

## Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Hero, capability strip, what we do, solutions grid, process, differentiators, audiences, mobile app |
| `/about` | About Us | Story, mission, vision, values, timeline |
| `/solutions` | Solutions | The full catalogue, plus where each module sits in the claim lifecycle |
| `/solutions/:slug` | Solution detail | One page per module — overview, capabilities, step-by-step flow, related modules |
| `/why-us` | Why Us | Four pillars, a before/after comparison table, and what we explicitly *don't* claim |
| `/team` | Our Team | Team composition by discipline, leadership placeholders, how onboarding runs |
| `/faqs` | FAQs | Searchable accordion |
| `/contact` | Contact | Enquiry form, contact details, what happens next |
| `*` | 404 | Falls back with links to everything else |

There is deliberately **no "Our Clients" section** — per the client's instruction, that gets added
later once logos are cleared.

## Where the content comes from

The seven solutions in `src/data/solutions.js` are not invented — each maps to real code:

| Solution | Source |
|---|---|
| Motor Claim Survey | `car-damage-insurance-web-app/src/pages/flows/claim/*` — Workshop, Surveyor and Weblink flows |
| Pre-Inspection & Break-in | `car-damage-insurance-web-app/src/pages/flows/preinspection/*` — Agent, Surveyor and Weblink flows |
| AI Damage Assessment | `ai-damage-assessment-service/` — YOLO11-seg detection, rule-based cost engine, cause-of-loss check, Llama-drafted ILA, corrections → retraining loop |
| Intimation Management | `car-damage-insurance-web-app/src/pages/admin/intimation/*` — surveyor allocation, claim handler, ILA/FLA, recommendation, fee bill, DMS, analytics |
| Surveyor Mobile App | `car_damage_insurance_app/` — native Flutter port of the claim-workshop flow |
| Partner Network Console | `car-damage-insurance-web-app/src/pages/admin/*` — insurer, broker, surveyor, workshop masters and user creation |
| Non-Motor Claims | The adjacent branch the client asked to represent — fire, marine, engineering, health, liability |

## Before this goes live

Search the codebase for `TODO` — everything that needs the client's real data is marked. In
particular:

- **`src/data/site.js`** — phone, email, both office addresses, social links, and the `APP_LINKS`
  URLs behind the "Login" buttons. All are placeholders right now. Also holds `LEGAL`, whose
  **CIN and GSTIN are dummy values** (`U00000XX0000PTC000000` / `00XXXXX0000X0XX`) — replace them
  with VroomSync Expertise Pvt Ltd's real registration numbers, and have the six declaration
  paragraphs reviewed by whoever signs off legal copy before launch.
- **`src/data/images.js`** — every photograph on the site is a hotlinked Unsplash image (free for
  commercial use, no attribution required). Each URL was fetched and visually checked before being
  used, so nothing is dead or off-topic — but they are still stock. Replace them with the client's
  own photography of their surveyors, workshops and office. Nothing outside this file references an
  Unsplash URL, so it is a one-file change.
- **`src/data/content.js`** — `TEAM_PROFILES` are rendered as visibly-badged placeholder cards
  (desaturated stock portraits, an amber "Placeholder" chip, and an on-page note to the site owner)
  until real names, roles, bios and photographs are supplied. **Do not launch with these as-is** —
  they present stock models where the client's leadership should be. Removing `placeholder: true`
  drops the badge and the desaturation. `STATS` and `MILESTONES` are illustrative — swap in audited
  figures and confirmed dates.
- **`src/pages/ContactPage.jsx`** — the enquiry form currently logs to the console and shows a
  success message. Point `onFinish` at the real endpoint or CRM before launch.
- **`src/components/layout/Footer.jsx`** — the five policy links (Privacy, Terms, Cookies,
  Disclaimer, Grievance Redressal) all point at `/contact` until the real documents exist. Their
  targets live in `LEGAL.policies`.
- **Logo — check the co-branding.** The navbar, footer, drawer and favicon now use the real
  IBima Assist mark, extracted from the product app's `src/assets/logo.png`. That source file is a
  **co-branding lockup holding two logos**: New India Assurance (a client insurer) on the left and
  IBima Assist on the right. Only the right-hand mark is used here — putting a client's logo in
  this site's own chrome would present them as part of this brand. If the client does want the
  New India Assurance logo shown, it belongs in a clients/partners section with their written
  permission, not in the header. Re-run `node scripts/extract-logo.mjs` if the source logo changes;
  it regenerates `public/logo-ibima.png`, `public/logo-ibima-icon.png` and `public/favicon.png`.
  A vector (SVG) version of the mark would render more sharply than the supplied 602×134 PNG —
  worth asking the client for.
- **`src/components/ui/PlatformVisual.jsx`** — the hero composition is drawn in CSS/SVG rather
  than screenshotted, so it needs no assets. Swap for real product screenshots once they are
  cleared for marketing use.

## Naming

- **IBima Assist** — the product, and the name in the wordmark, page titles and body copy.
- **VroomSync Expertise Pvt Ltd** — the company that owns and operates it. Appears as
  "Powered by …" under the footer wordmark, in the copyright line, and throughout the
  declarations block.

Both come from `BRAND` in `src/data/site.js`. Change them there and the whole site follows —
nothing hard-codes either name.

## Architecture notes

- **`src/data/*` holds all copy.** Pages are layout; the words live in `site.js`, `solutions.js`
  and `content.js`. Editing marketing copy should never mean touching a component.
- **Icons come from Lucide** (`src/components/ui/Icon.jsx`), so the whole site sits on one properly
  drawn set at a consistent stroke weight. Data files refer to icons by string key, which keeps JSX
  out of the data. Lucide v1 dropped brand marks, so the three social logos are defined in that
  file as their real trademarked paths.
- **Photographs go through `<Img>`** (`src/components/ui/Img.jsx`) — responsive `srcset` so phones
  don't pull a 1600px file, native lazy loading below the fold, a brand-tinted placeholder while
  the image arrives, and a fade-in once it does. The URLs are built by `img()` in
  `src/data/images.js`, which appends Unsplash's width/quality/format parameters.
- **Every section carries a photograph of its own subject**, so the page is scannable before it's
  read. `src/data/images.js` maps each one: `SOLUTION_IMAGES` per module, `SOLUTION_DETAIL_IMAGES`
  for a module's capabilities and outcome, `PROCESS_IMAGES` per claim stage, `AUDIENCE_IMAGES` per
  persona, `BRANCH_IMAGES` per non-motor line, `getModeImage()` per capture channel, and
  `SECTION_IMAGES` for everything else. `<SectionBanner name="…">` renders the wide bands.

  Two checks back this up, and they answer different questions:
  - `npm run audit:images` — **does every section have an image?** Fails the build if one is bare.
    Walks the rendered DOM, so a section added later can't slip through.
  - `npm run report:images` — **is it the right image?** Prints every section with the photo ID and
    alt text it uses, and flags any photograph leading two sections on the same page. Read the
    output; a machine can't judge whether a picture matches a heading, but it can lay the pairing
    out so you can. Hero backdrops are marked `~` and excluded from the repeat check — they render
    at ~15% opacity as texture, not as the section's picture.

  Each `PHOTOS` entry carries a comment describing what the photograph actually shows. Keep that
  accurate — it is the only way a later swap can be checked without re-downloading everything.
- **Client-supplied artwork** goes in `src/assets/` and is registered in `ARTWORK` in
  `src/data/images.js`, then referenced with `localShot()` instead of `shot()`. `<Img>` takes
  either a remote `base` or a local `src`; `<PageHero photo={…}>` takes either a base string or a
  whole shot object. Local files are bundled and hashed by Vite rather than hotlinked, and get no
  `srcset` — supply them at roughly the size they'll be shown.
- **Motion is CSS-driven, no animation library.** `src/index.css` holds the keyframes and classes;
  `src/components/ui/Motion.jsx` and `Reveal.jsx` only feed them a number or a class:
  `<Reveal from="up|down|left|right|scale|blur">` for scroll entrances, `<Parallax>` for depth,
  `<Spotlight>` for the cursor-tracked glow on dark cards, `<WordReveal>` for the hero headline,
  `<ScrollProgress>` for the bar under the navbar, and `<PageTransition>` for the route fade.
  Decorative classes — `.sheen`, `.ken-burns`, `.scan-line`, `.dash-draw`, `.halo`,
  `.nav-underline`, `.float-slow`, `.marquee-track` — are applied directly.
- **antd is deliberately not mounted at the root.** It is ~130 kB gzipped and only three surfaces
  use it (mobile drawer, FAQ accordion, contact form), each already in a lazy chunk. They wrap
  themselves in `src/theme/AntdScope.jsx` instead, which keeps antd out of the entry bundle
  entirely — the landing page never downloads it. If a fourth antd surface appears, wrap it in
  `AntdScope` rather than hoisting the provider back to `main.jsx`.
- **Routes are code-split** except the home page, which ships in the entry chunk since it is the
  usual first paint.
- **`npm run smoke`** server-renders every page (including all seven solution detail pages and the
  unknown-slug redirect) and fails on any runtime error. Run it before shipping — it catches the
  class of bug a passing `vite build` does not.
- **Motion respects `prefers-reduced-motion`** — every reveal, parallax, marquee, ken-burns, scan,
  sheen and counter degrades to its final state. That fallback lives in one `@media` block at the
  bottom of `src/index.css`; add new animations to it when you add them.

## Responsive behaviour

Breakpoints: `xs` 400px (added — Tailwind's default jump from 0 to `sm`/640px leaves most Indian
phones sharing a layout with 320px devices), then Tailwind's `sm` 640, `md` 768, `lg` 1024,
`xl` 1280, `2xl` 1536.

- **Type scales fluidly**, not in steps. `text-display`, `text-h1`, `text-h2`, `text-h3` and
  `text-lead` are `clamp()`-based utilities in `src/index.css`, so a 1180px laptop gets a size
  chosen for 1180px rather than the one picked for 1024px. Use them instead of long
  `text-2xl sm:text-3xl lg:text-4xl` chains.
- **Gutters and section rhythm scale too** — `container-page` uses `clamp(1rem, 4vw, 2rem)` and
  `section-y` uses `clamp(3.25rem, …, 6rem)`.
- **Horizontal overflow is clamped at the root** (`overflow-x: clip` on `html, body`). That's a
  safety net, not a licence — the audit below still fails on any element that sticks out.
- **The desktop nav appears at `lg`.** Seven links plus two buttons need ~1024px before they
  crowd; below that everything moves into the drawer.

Run `npm run audit:responsive` after any layout change. It loads all 15 URLs at 10 widths
(320 → 2560) in a real browser and fails on:

| Check | Bar |
|---|---|
| Horizontal page overflow | `scrollWidth` must not exceed `clientWidth` |
| Element wider than the viewport | unless an ancestor clips it (`overflow-x`) |
| Element hanging off-canvas | same clipping exemption; `position: fixed` exempt |
| Text too small | 11px minimum |
| Tap target too small | 24×24 on touch viewports — WCAG 2.2 SC 2.5.8 AA |

Before measuring it settles the page: scrolls to the bottom so lazy images and scroll-reveals
fire, forces every `.reveal` to `is-visible`, and disables all animation and transition. Without
that it would catch elements mid-slide and report the animation as a layout break.

Two escape hatches, both used sparingly:
- `data-decorative` on an element exempts its subtree from the minimum-font-size rule. Only
  `PlatformVisual` uses it — that's a drawing of a product UI, and its labels are meant to look
  miniature. It's `aria-hidden` for the same reason.
- Anything inside an `overflow-x` container is allowed to be wider than the viewport, which is
  what makes the marquee and the horizontally-scrolling pipeline legal.

## Deployment

### Vercel

The 404-on-refresh you get from a Vite SPA is the router asking the host for a path that has no
file behind it. `vercel.json` fixes it by rewriting everything except real assets to
`index.html`.

**If you still get `404: NOT_FOUND` after a deploy, the cause is almost always the Root
Directory setting, not the config.** This repo holds several projects side by side, so Vercel
must be told which one to build:

1. Vercel dashboard → your project → **Settings → General → Root Directory**
2. Set it to `ibima-assist-website` and save.
3. Settings → General → Build & Output: leave everything on **Framework Preset: Vite**. The
   values in `vercel.json` (`buildCommand`, `outputDirectory: dist`) take precedence anyway.
4. **Redeploy** — and untick "Use existing Build Cache" so the new `vercel.json` is picked up.

To confirm the fix, open a deep link directly (e.g. `https://<your-domain>/solutions/pre-inspection`)
and hard-refresh. It should render the page, not a 404.

### Other hosts

`public/_redirects` carries the same fallback for Netlify and Cloudflare Pages. On nginx, Apache
or S3+CloudFront, configure the equivalent: serve `index.html` for any path that doesn't match a
file in `dist/`.
