// =============================================================
// IMAGERY
// Every URL here was fetched and visually checked before being
// used, so nothing points at a dead link or an off-topic photo.
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
// Each entry notes what the photograph actually shows, so a future
// edit doesn't put a portrait where a workshop shot belongs.
export const PHOTOS = {
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

    // Busy open-plan office, people at desks.
    office: 'photo-1560264280-88b68371db39',
    // Colleagues talking across an office desk.
    officeCollab: 'photo-1560264350-1a8891f44df0',
    // Person at a desk with documents, on the phone.
    deskWork: 'photo-1642522029686-5485ea7e6042',

    // Business portraits — used only on the clearly-badged
    // leadership placeholders until real photographs arrive.
    portraitA: 'photo-1560250097-0b93528c311a',
    portraitB: 'photo-1573496359142-b8d87734a5a2',
    portraitC: 'photo-1573497161161-c3e73707e25c',
};

// ── Per-solution hero imagery ──────────────────────────────────
// Keyed by the slugs in src/data/solutions.js.
export const SOLUTION_IMAGES = {
    'motor-claim-survey': { base: PHOTOS.crashFront, alt: 'Close-up of a damaged car front end being surveyed' },
    'pre-inspection': { base: PHOTOS.inspection, alt: 'Inspector checking a vehicle’s panels with a hand lamp' },
    'ai-damage-assessment': { base: PHOTOS.crashRear, alt: 'Damaged rear quarter panel of a car' },
    'intimation-management': { base: PHOTOS.deskWork, alt: 'Claims handler working through a file at a desk' },
    'surveyor-mobile-app': { base: PHOTOS.underHood, alt: 'Surveyor inspecting an engine bay' },
    'partner-network-console': { base: PHOTOS.onLift, alt: 'Car raised on a lift inside a partner workshop' },
    'non-motor-claims': { base: PHOTOS.teamInspect, alt: 'Assessors examining damage together on site' },
};

export const getSolutionImage = (slug) =>
    SOLUTION_IMAGES[slug] ?? { base: PHOTOS.crashFront, alt: 'Vehicle damage assessment' };
