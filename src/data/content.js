// =============================================================
// PAGE CONTENT
// Narrative copy that isn't tied to a single solution: stats,
// differentiators, process, mission/vision, team, FAQs.
// =============================================================

// Headline numbers. TODO: swap in the client's audited figures —
// these are illustrative placeholders and are marked as such in
// the UI copy where a claim would otherwise be made.
export const STATS = [
    { value: 6, suffix: '', label: 'Capture journeys', sub: 'Claim and pre-inspection, across three channels each' },
    { value: 10, suffix: '+', label: 'Mandatory angles', sub: 'Guided per vehicle, before a survey can be filed' },
    { value: 3, suffix: '', label: 'Vehicle categories', sub: 'Car, two-wheeler and commercial vehicle' },
    { value: 24, suffix: '×7', label: 'Capture availability', sub: 'Weblink and mobile app, no office hours' },
];

// Who the platform is built for — used on the home page.
export const AUDIENCES = [
    {
        title: 'Insurers',
        detail: 'Cut settlement cycles, standardise evidence across every channel, and see the whole book on one dashboard.',
        icon: 'building',
    },
    {
        title: 'Surveyors & Loss Assessors',
        detail: 'Complete more surveys a day with guided capture, and let the assessment engine draft the report.',
        icon: 'clipboard',
    },
    {
        title: 'Brokers & Agents',
        detail: 'Get pre-inspections and break-in cases done on the spot from a phone, without a back-and-forth.',
        icon: 'handshake',
    },
    {
        title: 'Repair Workshops',
        detail: 'File a complete, accepted-first-time survey from the workshop floor and get to approval faster.',
        icon: 'wrench',
    },
    {
        title: 'Policyholders',
        detail: 'Open a link, follow the prompts, and your claim is filed — no app, no forms, no branch visit.',
        icon: 'user',
    },
    {
        title: 'Corporates & Fleets',
        detail: 'Keep a condition baseline on every vehicle and run claims across the fleet from one place.',
        icon: 'fleet',
    },
];

// The four pillars on the Why Us page and home page.
export const DIFFERENTIATORS = [
    {
        title: 'Evidence you can defend',
        detail: 'Photographs are captured live inside the app with GPS and a timestamp written in, framed against an on-screen guide, and backed by a continuous walk-around video. It is a file built to survive scrutiny, not a folder of forwarded images.',
        icon: 'shield',
    },
    {
        title: 'AI that shows its working',
        detail: 'Computer vision finds the damage, but the pricing comes from an auditable rate table and explicit rules. Every line of an estimate can be traced to why it is there — and assessors correct anything the model gets wrong, which is what trains the next version.',
        icon: 'ai',
    },
    {
        title: 'Built by claims people',
        detail: 'The workflow follows how claims actually move — intimation, allocation, survey, ILA, FLA, recommendation, fee bill — because it was designed around that reality rather than retrofitted onto generic case management.',
        icon: 'expertise',
    },
    {
        title: 'One platform, every channel',
        detail: 'Workshop, surveyor, agent and self-service capture all produce the same structured file. Web and native mobile run the same journey screen for screen, so there is one process to train and one dataset to report on.',
        icon: 'layers',
    },
];

// Home page "how it works".
export const PROCESS = [
    {
        step: '01',
        title: 'Intimate',
        detail: 'The loss is reported and a claim file is opened with the policy, insured and cause of loss on record.',
    },
    {
        step: '02',
        title: 'Allocate',
        detail: 'A surveyor is appointed, or a capture link goes to the workshop or the customer directly.',
    },
    {
        step: '03',
        title: 'Capture',
        detail: 'The guided journey collects every mandatory photograph, the walk-around video, documents and signed declarations.',
    },
    {
        step: '04',
        title: 'Assess',
        detail: 'Detection identifies the damaged parts, the cost engine prices them, and the draft assessment is generated.',
    },
    {
        step: '05',
        title: 'Settle',
        detail: 'The handler reviews, records the recommendation, closes the fee bill and settles the claim.',
    },
];

export const MISSION = {
    mission:
        'To take the guesswork, the delay and the paperwork out of claims — by putting a disciplined capture process in the hands of whoever is standing next to the loss, and an assessment engine behind whoever has to price it.',
    vision:
        'A claims ecosystem where evidence is captured right the first time, assessment is consistent and explainable, and a policyholder knows where their claim stands without having to ask.',
};

export const VALUES = [
    {
        title: 'Evidence first',
        detail: 'If it was not captured properly, nothing downstream can fix it. The capture step gets the most attention.',
    },
    {
        title: 'Explainable over clever',
        detail: 'A number an assessor cannot defend is worse than no number. Automation has to show its reasoning.',
    },
    {
        title: 'Field-realistic',
        detail: 'Basements, glare, bad signal and a customer in a hurry. The product is designed for those conditions.',
    },
    {
        title: 'Fair to the insured',
        detail: 'Consistency protects the honest claimant as much as it protects the insurer. Both matter.',
    },
];

// Company timeline. TODO: confirm dates and milestones with the client.
export const MILESTONES = [
    { year: '2018', title: 'Founded', detail: 'Started as a motor survey practice serving insurers and surveyor firms.' },
    { year: '2021', title: 'Digital capture', detail: 'The guided survey journey replaced the ad-hoc photo-and-email process.' },
    { year: '2023', title: 'Claims console', detail: 'Intimation, allocation, ILA/FLA and fee-bill workflow brought onto one platform.' },
    { year: '2024', title: 'Native mobile', detail: 'The full survey journey shipped as a native Android and iOS application.' },
    { year: '2025', title: 'AI assessment', detail: 'Segmentation-based damage detection with a rules-driven cost engine and drafted ILA narrative.' },
];

// Team capability blocks — real and safe to publish. Individual
// leadership profiles are deliberately left as placeholders in
// TEAM_PROFILES below for the client to fill in.
export const TEAM_CAPABILITIES = [
    {
        title: 'Insurance domain',
        detail: 'Claims managers, underwriters and IRDAI-licensed surveyors who have run motor and non-motor books, and who set what the product has to do.',
        icon: 'expertise',
    },
    {
        title: 'AI & computer vision',
        detail: 'Engineers working on segmentation models, the annotation pipeline and the correction-to-retraining loop behind the assessment engine.',
        icon: 'ai',
    },
    {
        title: 'Product & engineering',
        detail: 'The web console, the native mobile app and the services behind them — built and maintained in-house.',
        icon: 'code',
    },
    {
        title: 'Operations & support',
        detail: 'Onboarding, training for workshop and surveyor networks, and day-to-day support for live claim traffic.',
        icon: 'support',
    },
];

// TODO: replace with real leadership names, roles, bios and photographs.
// `photo` keys into PHOTOS in src/data/images.js. Until real people are
// supplied these are stock portraits and the cards render with a visible
// "Placeholder" badge plus an on-page note — do not ship as-is.
export const TEAM_PROFILES = [
    {
        name: 'Leadership profile',
        role: 'Founder & Chief Executive Officer',
        bio: 'Bio to be supplied.',
        photo: 'portraitA',
        placeholder: true,
    },
    {
        name: 'Leadership profile',
        role: 'Chief Operating Officer',
        bio: 'Bio to be supplied.',
        photo: 'portraitB',
        placeholder: true,
    },
    {
        name: 'Leadership profile',
        role: 'Chief Technology Officer',
        bio: 'Bio to be supplied.',
        photo: 'portraitC',
        placeholder: true,
    },
];

export const FAQS = [
    {
        q: 'What does IBima Assist actually do?',
        a: 'We provide the technology that runs a general insurance claim end to end — guided evidence capture at the scene, AI-assisted damage assessment, and a claims console that moves the file from first notice of loss through to settlement and the surveyor fee bill.',
    },
    {
        q: 'Do you handle anything other than motor claims?',
        a: 'Motor is where the platform is deepest, but the underlying machinery is branch-agnostic. Fire and property, marine and transit, engineering, health and personal accident, and liability claims run on the same pipeline with their own checklists and report formats. Coverage is delivered progressively — tell us which lines you need first.',
    },
    {
        q: 'Does the customer need to install an app?',
        a: 'No. The weblink journey opens in any mobile browser — the customer taps the link, follows the on-screen prompts and the claim is filed. The native app is for surveyors, agents and workshop staff who do this all day and benefit from offline capture.',
    },
    {
        q: 'How do you stop someone submitting old or borrowed photographs?',
        a: 'Photographs are taken live inside the app, not picked from the gallery, and are stamped with GPS coordinates and a timestamp. Each angle is framed against an on-screen silhouette, and a continuous walk-around video ties the individual shots to one vehicle at one moment.',
    },
    {
        q: 'Is the AI making the settlement decision?',
        a: 'No. The model identifies which parts are damaged and how badly. Costing comes from an auditable rate table and explicit rules, and the output is a draft the assessor reviews and approves. Where the assessor disagrees, their correction is recorded — and those corrections are what train the next version of the model.',
    },
    {
        q: 'How accurate is the damage detection?',
        a: 'Accuracy depends on how much of your own claim portfolio the model has been fine-tuned on. We start from a base model, run it alongside your assessors, and use the correction loop to improve it against your actual mix of vehicles and damage types. We will not quote you a number that has not been measured on your data.',
    },
    {
        q: 'Can it work with the systems we already run?',
        a: 'Yes. The platform is service-based and is designed to exchange claim, policy and document data with existing core systems. We scope the integration during onboarding — get in touch with what you are running.',
    },
    {
        q: 'What about data security and privacy?',
        a: 'Claim files contain personal and vehicle data, and are handled accordingly: role-based access so users only see their own claims, encrypted transport, and an audit trail on every action. We will walk your information security team through the full posture during evaluation.',
    },
    {
        q: 'How long does it take to go live?',
        a: 'A weblink-based capture journey can be running quickly because there is nothing to install. Full deployment — partner onboarding, user roles, workflow configuration and any core-system integration — is scoped against your requirements. Talk to us and we will give you a realistic timeline rather than a brochure one.',
    },
    {
        q: 'How is it priced?',
        a: 'Pricing depends on the modules you take and your claim volume. Contact us for a proposal built around your book.',
    },
];

// Small trust strip on the home page. These are capabilities, not
// customer logos — the client asked to leave clients off for now.
export const CAPABILITY_STRIP = [
    'Guided 360° capture',
    'GPS + timestamp evidence',
    'Walk-around video',
    'AI damage detection',
    'Rule-based costing',
    'Cause-of-loss check',
    'ILA & FLA workflow',
    'Surveyor allocation',
    'Fee bill closure',
    'Document management',
    'Claim analytics',
    'Native Android & iOS',
];
