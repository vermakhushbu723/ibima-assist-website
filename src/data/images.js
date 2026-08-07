// =============================================================
// IMAGERY
// Every URL here was fetched and visually checked before being
// used, so nothing points at a dead link or an off-topic photo.
// The comment above each base says what the photograph actually
// shows — keep that accurate, it is the only way a later edit can
// tell whether a swap still makes sense.
//
// Source: Unsplash (free to use commercially, no attribution
// required — https://unsplash.com/license). They are hotlinked
// from Unsplash's CDN, which is what the licence and their image
// API guidelines expect.
//
// TODO before launch: swap these for the client's own photography
// of their surveyors, workshops and office. Only this file needs
// to change — nothing imports an Unsplash URL directly.
// =============================================================

// ── Client-supplied artwork ────────────────────────────────────
// Bundled locally rather than hotlinked. Vite hashes these on build.
import preInspectionCapture from '../assets/pre-inspection-capture.jpg';

const CDN = 'https://images.unsplash.com';

/**
 * Builds a sized, compressed, auto-format URL off a base photo.
 * `fit=crop` plus an explicit width keeps the payload sane —
 * the raw originals are several megabytes each.
 */
export const img = (base, { w = 1200, h, q = 72 } = {}) => {
    const parts = [`w=${w}`, `q=${q}`, 'auto=format', 'fit=crop'];
    if (h) parts.push(`h=${h}`);
    return `${CDN}/${base}?${parts.join('&')}`;
};

// ── Photo bases ────────────────────────────────────────────────
export const PHOTOS = {
    // ── Motor / damage ─────────────────────────────────────────
    // Close-up of a crashed front end — headlight and crumpled wing.
    crashFront: 'photo-1597328290883-50c5787b7c7e',
    // Red hatchback with heavy rear-quarter damage, on a flatbed.
    crashRear: 'photo-1673187139211-1e7ec3dd60ec',
    // Inspector walking a car with a hand lamp, checking the panels.
    inspection: 'photo-1652987086612-d948b775d358',
    // Car with the front bumper removed, wheel and structure exposed.
    stripped: 'photo-1679709161252-0229a8a9b586',
    // Mechanic leaning into an engine bay.
    underHood: 'photo-1625047509248-ec889cbff17f',
    // Technician working under a bonnet in a workshop, lamp lit.
    technician: 'photo-1615906655593-ad0386982a0f',
    // Car raised on a two-post lift inside a garage.
    onLift: 'photo-1618312980096-873bd19759a0',
    // Small group inspecting an open engine bay together.
    teamInspect: 'photo-1690051840072-0c8a4a498854',
    // Underside of a vehicle — suspension and subframe.
    underBody: 'photo-1702146713858-8e7d1cc29fe8',
    // Technician standing beside an open car door in a workshop.
    workshopFloor: 'photo-1618312980089-c7cfe73ebb85',

    // ── Office / people ────────────────────────────────────────
    // Busy open-plan office, people at desks.
    office: 'photo-1560264280-88b68371db39',
    // Colleagues talking across an office desk.
    officeCollab: 'photo-1560264350-1a8891f44df0',
    // Person at a desk with documents, on the phone.
    deskWork: 'photo-1642522029686-5485ea7e6042',
    // Two people shaking hands in an office.
    handshake: 'photo-1521791136064-7986c2920216',
    // Support team wearing headsets at their desks.
    supportTeam: 'photo-1603714228681-b399854b8f80',
    // Hand signing a document with a fountain pen.
    signing: 'photo-1450101499163-c8848c66ca85',
    // A single headset resting beside an open laptop.
    headsetDesk: 'photo-1553775282-20af80779df7',
    // Stone staircase rising in even flights.
    stairs: 'photo-1571574125572-3a86fc5b3fac',

    // ── Devices / data ─────────────────────────────────────────
    // Two hands holding and typing on a smartphone.
    smartphone: 'photo-1526045612212-70caf35c14df',
    // Analytics dashboard filling a monitor — charts and KPIs.
    analytics: 'photo-1551288049-bebda4e38f71',
    // Laptop on a desk showing a reporting dashboard.
    analyticsDesk: 'photo-1460925895917-afdab827c52f',
    // Syntax-highlighted source code filling a screen.
    code: 'photo-1515879218367-8466d910aaa4',
    // A glowing neon question mark on a dark wall.
    questionMark: 'photo-1599508704512-2f19efd1e35f',

    // ── Non-motor branches ─────────────────────────────────────
    // Container port with gantry cranes and stacked containers.
    marinePort: 'photo-1601311852860-1d8f42381551',
    // House well alight — fire visible through the windows.
    fireDamage: 'photo-1516567832553-66232148f74c',
    // Interior of an industrial plant — gantries and machinery.
    engineeringPlant: 'photo-1496247749665-49cf5b1022e9',
    // Stethoscope on a plain surface.
    healthCare: 'photo-1505751172876-fa1923c5c528',
    // Articulated truck on a highway at dusk.
    truckFleet: 'photo-1616432043562-3671ea2e5242',

    // ── Open road (journey / direction) ─────────────────────────
    // Straight tree-lined road running to the horizon.
    roadAhead: 'photo-1486673748761-a8d18475c757',
    // Winding mountain road at sunrise.
    roadWinding: 'photo-1542242476-5a3565835a38',

    // Business portraits — used only on the clearly-badged
    // leadership placeholders until real photographs arrive.
    portraitA: 'photo-1560250097-0b93528c311a',
    portraitB: 'photo-1573496359142-b8d87734a5a2',
    portraitC: 'photo-1573497161161-c3e73707e25c',
};

// A photo plus the alt text that describes it. Bundling the two
// means a caller can never pair the right image with the wrong
// description.
const shot = (base, alt) => ({ base, alt });

// The same, for a locally bundled file. <Img> takes `src` in place of
// `base` and skips the Unsplash URL building.
const localShot = (src, alt) => ({ src, alt });

// Client-supplied artwork, keyed like PHOTOS so it reads the same at
// the call site.
export const ARTWORK = {
    // Inspector photographing a car with a phone and tablet, overlaid
    // with a "PRE-INSPECTION — Condition Baseline Capture" checklist
    // (exterior 360°, interior, odometer, chassis number, existing
    // damage, location & time).
    preInspection: preInspectionCapture,
};

// ── Per-solution hero imagery ──────────────────────────────────
// Keyed by the slugs in src/data/solutions.js.
export const SOLUTION_IMAGES = {
    'motor-claim-survey': shot(PHOTOS.crashFront, 'Close-up of a damaged car front end being surveyed'),
    // Client-supplied artwork: it names the module and lists its own
    // capture checklist, so it says more than any stock photo could.
    'pre-inspection': localShot(
        ARTWORK.preInspection,
        'Inspector capturing a vehicle’s condition baseline — exterior 360°, interior, odometer, chassis number, existing damage and location all recorded',
    ),
    'ai-damage-assessment': shot(PHOTOS.crashRear, 'Damaged rear quarter panel of a car'),
    'intimation-management': shot(PHOTOS.deskWork, 'Claims handler working through a file at a desk'),
    'surveyor-mobile-app': shot(PHOTOS.underHood, 'Surveyor inspecting an engine bay'),
    'partner-network-console': shot(PHOTOS.onLift, 'Car raised on a lift inside a partner workshop'),
    // Deliberately NOT a car. This page covers fire, marine,
    // engineering, health and liability — a motor scene here was
    // telling visitors the opposite of what the page is about.
    'non-motor-claims': shot(PHOTOS.marinePort, 'Container port — one of the non-motor branches covered'),
};

export const getSolutionImage = (slug) =>
    SOLUTION_IMAGES[slug] ?? shot(PHOTOS.crashFront, 'Vehicle damage assessment');

// A detail page runs the module's own photograph in the hero and the
// side rail. Its "Capabilities" and "Step by step" sections need their
// own subject or the page becomes the same picture four times over —
// so each module gets a `detail` shot (what it does close up) and an
// `outcome` shot (what you end up with).
//
// Optional `hero` (the dim backdrop) and `rail` (the large visible card
// beside the overview) override those slots on that page only, leaving
// SOLUTION_IMAGES to keep driving the module's cards elsewhere on the
// site.
export const SOLUTION_DETAIL_IMAGES = {
    'motor-claim-survey': {
        detail: shot(PHOTOS.stripped, 'Bumper removed to expose the damage underneath'),
        outcome: shot(PHOTOS.signing, 'Customer declaration signed off on the completed survey'),
    },
    'pre-inspection': {
        detail: shot(PHOTOS.onLift, 'Vehicle raised for a full condition check'),
        outcome: shot(PHOTOS.signing, 'Inspection declaration signed before cover starts'),
    },
    'ai-damage-assessment': {
        detail: shot(PHOTOS.analytics, 'Detected parts and severity on the assessment screen'),
        outcome: shot(PHOTOS.analyticsDesk, 'Drafted loss advice ready for the assessor to review'),
    },
    'intimation-management': {
        detail: shot(PHOTOS.analyticsDesk, 'Claim pipeline and stage-wise turnaround on a dashboard'),
        outcome: shot(PHOTOS.handshake, 'Recommendation agreed and the claim settled'),
    },
    'surveyor-mobile-app': {
        detail: shot(PHOTOS.smartphone, 'Surveyor working through the capture flow on a phone'),
        outcome: shot(PHOTOS.workshopFloor, 'Survey filed from the workshop floor'),
    },
    'partner-network-console': {
        detail: shot(PHOTOS.office, 'Administrators managing the partner network'),
        outcome: shot(PHOTOS.handshake, 'A new workshop onboarded onto the network'),
    },
    'non-motor-claims': {
        // Client asked for their capture artwork on this page. Scoped to
        // this page's hero and rail so the "Non-Motor Claims" cards
        // elsewhere on the site still show a non-motor scene.
        hero: localShot(ARTWORK.preInspection, 'Inspector capturing a condition baseline on site'),
        rail: localShot(
            ARTWORK.preInspection,
            'Inspector capturing a condition baseline — exterior, interior, odometer, chassis number, existing damage and location all recorded',
        ),
        detail: shot(PHOTOS.technician, 'Assessor examining damage in detail on site'),
        outcome: shot(PHOTOS.deskWork, 'Branch report compiled and the file closed'),
    },
};

export const getSolutionDetailImages = (slug) =>
    SOLUTION_DETAIL_IMAGES[slug] ?? {
        detail: getSolutionImage(slug),
        outcome: getSolutionImage(slug),
    };

// ── The five claim stages ──────────────────────────────────────
// Indexed by PROCESS order in src/data/content.js. Also drives the
// pipeline strip on the Solutions page, so the same stage reads the
// same way in both places.
export const PROCESS_IMAGES = [
    shot(PHOTOS.smartphone, 'Policyholder reporting a loss from a smartphone'),
    shot(PHOTOS.deskWork, 'Claims handler allocating a file to a surveyor'),
    shot(PHOTOS.inspection, 'Surveyor photographing vehicle damage on site'),
    shot(PHOTOS.analytics, 'Assessment dashboard showing the priced estimate'),
    shot(PHOTOS.handshake, 'Settlement agreed and the claim closed'),
];

// ── Audiences ──────────────────────────────────────────────────
// Keyed by AUDIENCES[].title in src/data/content.js.
export const AUDIENCE_IMAGES = {
    Insurers: shot(PHOTOS.office, 'Insurer claims operations floor'),
    'Surveyors & Loss Assessors': shot(PHOTOS.inspection, 'Surveyor inspecting a damaged vehicle'),
    'Brokers & Agents': shot(PHOTOS.handshake, 'Broker shaking hands with a client'),
    'Repair Workshops': shot(PHOTOS.onLift, 'Vehicle on a lift in a repair workshop'),
    Policyholders: shot(PHOTOS.smartphone, 'Policyholder filing a claim on their phone'),
    'Corporates & Fleets': shot(PHOTOS.truckFleet, 'Commercial truck on the highway at dusk'),
};

// ── Non-motor branches ─────────────────────────────────────────
// Keyed by the branch names in the non-motor-claims solution.
export const BRANCH_IMAGES = {
    'Fire & Property': shot(PHOTOS.fireDamage, 'Building well alight during a fire'),
    'Marine & Transit': shot(PHOTOS.marinePort, 'Container port with gantry cranes'),
    Engineering: shot(PHOTOS.engineeringPlant, 'Interior of an industrial plant'),
    'Health & Personal Accident': shot(PHOTOS.healthCare, 'Stethoscope on a clinical surface'),
    'Liability & Miscellaneous': shot(PHOTOS.signing, 'Hand signing a claim document'),
};

// ── Capture modes ──────────────────────────────────────────────
// Matched on a keyword in the mode name, because the claim and
// pre-inspection flows label the same three channels differently
// ("Workshop"/"Agent", "Surveyor", "Weblink").
const MODE_MATCHERS = [
    [/workshop/i, shot(PHOTOS.workshopFloor, 'Workshop staff capturing the survey on the floor')],
    [/agent/i, shot(PHOTOS.handshake, 'Agent completing an inspection with the customer')],
    [/surveyor/i, shot(PHOTOS.inspection, 'Surveyor running the inspection on site')],
    [/weblink/i, shot(PHOTOS.smartphone, 'Customer self-capturing from a link on their phone')],
];

export const getModeImage = (name) =>
    MODE_MATCHERS.find(([re]) => re.test(name))?.[1] ??
    shot(PHOTOS.inspection, 'Vehicle inspection in progress');

// ── Section banners ────────────────────────────────────────────
// One entry per section that isn't already carrying its own
// imagery, so every band on the site says what it is about before
// anyone reads a word.
export const SECTION_IMAGES = {
    // Home
    stats: shot(PHOTOS.analytics, 'Claims analytics dashboard on a monitor'),
    process: shot(PHOTOS.roadAhead, 'Open road running to the horizon'),
    differentiators: shot(PHOTOS.stripped, 'Car stripped back for a detailed damage assessment'),

    // About
    mission: shot(PHOTOS.roadAhead, 'Straight open road running to the horizon'),
    vision: shot(PHOTOS.analyticsDesk, 'Laptop showing a live claims dashboard'),
    values: shot(PHOTOS.onLift, 'Vehicle raised on a lift in a workshop'),
    timeline: shot(PHOTOS.stairs, 'Stone staircase rising flight by flight'),

    // Solutions
    pipeline: shot(PHOTOS.roadWinding, 'Winding road at sunrise'),
    modular: shot(PHOTOS.workshopFloor, 'Technician beside an open car door on a workshop floor'),

    // Why us
    comparison: shot(PHOTOS.signing, 'Hand signing a claim document'),
    honesty: shot(PHOTOS.underBody, 'Underside of a vehicle during inspection'),

    // Team
    capabilities: shot(PHOTOS.code, 'Platform source code on an engineer’s screen'),
    onboarding: shot(PHOTOS.handshake, 'Two people shaking hands to start work together'),

    // FAQ — the page hero is the question, the body is the answer.
    faqHero: shot(PHOTOS.questionMark, 'A glowing question mark'),
    faq: shot(PHOTOS.supportTeam, 'Support team wearing headsets at their desks'),
    support: shot(PHOTOS.headsetDesk, 'A headset waiting beside an open laptop'),

    // Contact
    nextSteps: shot(PHOTOS.handshake, 'Handshake at the start of a working relationship'),

    // 404
    notFound: shot(PHOTOS.roadWinding, 'Winding mountain road at sunrise'),
};

export const getSectionImage = (key) =>
    SECTION_IMAGES[key] ?? shot(PHOTOS.crashFront, 'Vehicle damage assessment');
