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
npm run dev        # http://localhost:5174
npm run build      # -> dist/
npm run preview    # serve the built output
npm run smoke      # render every page server-side and fail on any runtime error
```

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

- **`src/data/site.js`** — brand legal name, phone, email, both office addresses, social links, and
  the `APP_LINKS` URLs behind the "Login" buttons. All are placeholders right now.
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
- **`src/components/layout/Footer.jsx`** — Privacy Policy and Terms links point at `/contact`
  until the real documents exist.
- **`src/components/ui/BrandLogo.jsx`** and **`public/favicon.svg`** — replace the drawn mark with
  the client's supplied logo. Only those two files need to change.
- **`src/components/ui/PlatformVisual.jsx`** — the hero composition is drawn in CSS/SVG rather
  than screenshotted, so it needs no assets. Swap for real product screenshots once they are
  cleared for marketing use.

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

## Deployment

`vercel.json` rewrites every path to `index.html`, which is what the client-side router needs. On
any other host, configure the equivalent SPA fallback or deep links will 404.
