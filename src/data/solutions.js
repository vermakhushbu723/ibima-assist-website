// =============================================================
// SOLUTIONS CATALOGUE
// Every entry here describes something that actually exists in
// the platform:
//   - motor-claim-survey / pre-inspection / partner-console
//       -> car-damage-insurance-web-app (src/pages/flows, src/pages/admin)
//   - intimation-management
//       -> car-damage-insurance-web-app (src/pages/admin/intimation)
//   - ai-damage-assessment
//       -> ai-damage-assessment-service (YOLO11-seg + cost engine + ILA narration)
//   - surveyor-mobile-app
//       -> car_damage_insurance_app (Flutter)
//   - non-motor-claims is the adjacent branch the client asked to
//     represent (fire / marine / engineering / health / liability).
//
// `slug` drives /solutions/:slug. Keep slugs stable — they are the
// public URLs.
// =============================================================

export const SOLUTIONS = [
    {
        slug: 'motor-claim-survey',
        name: 'Motor Claim Survey',
        short: 'Digital loss assessment',
        icon: 'car',
        accent: '#E07B39',
        tagline: 'Guided, tamper-evident motor damage capture — from any workshop, surveyor or customer phone.',
        summary:
            'A step-by-step survey journey that walks whoever is standing next to the vehicle through every photograph, document and declaration a motor claim file needs — and refuses to move on until each one is captured correctly.',
        heroPoints: ['Three capture modes', '10-point 360° capture', 'GPS + timestamp stamped'],
        // The three entry points that exist on the product's landing screen.
        modes: [
            {
                name: 'Claim — Workshop',
                detail: 'The garage logs in and completes the survey on the customer’s behalf while the vehicle is on the floor.',
            },
            {
                name: 'Claim — Surveyor',
                detail: 'The IRDAI-licensed surveyor runs the same journey on their own login, with their inspector declaration attached.',
            },
            {
                name: 'Claim — Weblink',
                detail: 'A one-time link is sent to the insured. No app install, no login — they open it on their phone and self-capture.',
            },
        ],
        features: [
            {
                title: 'Guided 360° capture',
                detail: 'Front, rear, both sides, all four corners, odometer and chassis number — each with an on-screen silhouette overlay so the angle is right the first time.',
            },
            {
                title: 'Walk-around video',
                detail: 'A continuous orientation-locked video of the vehicle that makes it far harder to substitute a different car later.',
            },
            {
                title: 'Vehicle-aware guidance',
                detail: 'Separate capture guides and reference imagery for cars, two-wheelers and commercial vehicles.',
            },
            {
                title: 'Document collection',
                detail: 'RC, driving licence, claim form, KYC and the repair estimate, captured through a document camera with edge framing.',
            },
            {
                title: 'Damage & additional photos',
                detail: 'Free-form damage close-ups plus prompted extras — dashboard, tyres, windshield, under-body, open hood, doors open, and a selfie with the vehicle.',
            },
            {
                title: 'Dual declarations with e-signature',
                detail: 'Customer and inspector declarations are signed on the device and stored with the file.',
            },
            {
                title: 'Review before submit',
                detail: 'A damage review screen shows the complete manifest so nothing is submitted half-finished.',
            },
            {
                title: 'Reinspection & repair submission',
                detail: 'After approval the same file reopens for reinspection photographs and the final repair submission.',
            },
        ],
        steps: [
            { title: 'Start the claim', detail: 'Open a login or a weblink and pick the vehicle category.' },
            { title: 'Owner & vehicle details', detail: 'Capture insured, contact, policy, registration and insurer.' },
            { title: 'Documents', detail: 'RC, DL, claim form, KYC and repair estimate.' },
            { title: 'Guided photos & video', detail: 'Every mandatory angle, damage close-ups and the walk-around.' },
            { title: 'Declarations', detail: 'Customer and inspector sign on-screen.' },
            { title: 'Review & submit', detail: 'Confirm the manifest and file it to the claim handler.' },
        ],
        outcomes: [
            'Rejected and re-shot surveys drop sharply because the app blocks bad captures at source.',
            'Every image carries GPS coordinates and a timestamp, so provenance is never in dispute.',
            'A workshop, a surveyor and a customer all produce the same, comparable file.',
        ],
        audience: ['Insurers', 'Surveyors & loss assessors', 'Repair networks', 'Policyholders'],
    },
    {
        slug: 'pre-inspection',
        name: 'Pre-Inspection & Break-in',
        short: 'Underwriting-side inspection',
        icon: 'shield',
        accent: '#4F46E5',
        tagline: 'Establish the condition of a vehicle before the cover starts — and close the break-in gap.',
        summary:
            'The same disciplined capture journey, pointed at the underwriting side of the business: new-business inspections, lapsed-policy break-in cases and portfolio condition checks, evidenced well enough to stand up at claim time.',
        heroPoints: ['Agent, surveyor or self-serve', 'Condition baseline', 'Pre-existing damage on record'],
        modes: [
            {
                name: 'Pre-Inspection — Agent',
                detail: 'The agent or the branch runs the inspection at the point of sale.',
            },
            {
                name: 'Pre-Inspection — Surveyor',
                detail: 'A surveyor handles the inspection at the workshop or the customer’s location.',
            },
            {
                name: 'Pre-Inspection — Weblink',
                detail: 'The prospect self-inspects on their own phone from a link, with no install.',
            },
        ],
        features: [
            {
                title: 'Condition baseline',
                detail: 'A full 360° photo set plus odometer and chassis capture that becomes the reference for every later claim.',
            },
            {
                title: 'Pre-existing damage log',
                detail: 'Existing dents, scratches and cracks are photographed and recorded up front instead of being argued about later.',
            },
            {
                title: 'Break-in inspection',
                detail: 'Reinstating a lapsed policy is handled through the same evidence-backed flow.',
            },
            {
                title: 'Live-capture enforcement',
                detail: 'Photographs are taken inside the app with GPS and time stamped in — gallery uploads of stale images do not pass.',
            },
            {
                title: 'Instant decisioning input',
                detail: 'The completed inspection lands with the underwriter as a clean, structured file rather than a mail thread of photographs.',
            },
        ],
        steps: [
            { title: 'Trigger the inspection', detail: 'Agent login, surveyor login, or a weblink to the prospect.' },
            { title: 'Vehicle & proposer details', detail: 'Registration, make/model, proposer and contact details.' },
            { title: 'Documents', detail: 'RC and supporting identity documents.' },
            { title: 'Guided condition capture', detail: 'All mandatory angles, odometer, chassis and any existing damage.' },
            { title: 'Declaration & submit', detail: 'Signed declaration, then straight to the underwriting queue.' },
        ],
        outcomes: [
            'Fewer disputed claims from damage that predates the cover.',
            'Break-in cases close in hours instead of days.',
            'A consistent condition record across every channel that sells the policy.',
        ],
        audience: ['Insurers', 'Brokers & agents', 'Corporate fleet owners'],
    },
    {
        slug: 'ai-damage-assessment',
        name: 'AI Damage Assessment',
        short: 'Instant ILA from photographs',
        icon: 'ai',
        accent: '#0EA5E9',
        tagline: 'Computer vision reads the damage, a rules engine prices it, and a draft assessment writes itself.',
        summary:
            'Captured photographs are run through a segmentation model that identifies the affected parts and the damage on each one. A deterministic cost and severity engine turns that into a priced estimate, and a language model drafts the assessment narrative — leaving the assessor to review and approve rather than start from a blank page.',
        heroPoints: ['Part-level detection', 'Rule-based costing', 'Draft ILA narrative'],
        features: [
            {
                title: 'Part-level damage detection',
                detail: 'A YOLO11 segmentation model outlines each damaged panel and classifies what happened to it — dent, scratch, crack, shatter or a missing part.',
            },
            {
                title: 'Severity grading',
                detail: 'Damage area relative to the part decides whether it is a repair, a re-finish or a replacement.',
            },
            {
                title: 'Deterministic cost engine',
                detail: 'Pricing comes from an auditable rate table and labour rules, not from the model — so every number in the estimate can be explained line by line.',
            },
            {
                title: 'Cause-of-loss consistency check',
                detail: 'The damage pattern is tested against the declared cause of loss and anything that does not add up is flagged for investigation.',
            },
            {
                title: 'Auto-drafted ILA narrative',
                detail: 'The Immediate Loss Advice narrative is generated from the structured findings, in the assessor’s standard format.',
            },
            {
                title: 'Human-in-the-loop corrections',
                detail: 'Assessors correct anything the model got wrong; those corrections queue up and feed the next retraining round, so accuracy compounds.',
            },
            {
                title: 'Annotation studio',
                detail: 'An in-house tool for labelling claim photographs and growing the training set from your own portfolio.',
            },
        ],
        steps: [
            { title: 'Photographs arrive', detail: 'Straight from the survey or pre-inspection capture flow.' },
            { title: 'Detection', detail: 'Segmentation identifies each part and the damage on it.' },
            { title: 'Assessment', detail: 'Severity and cost rules produce a priced, line-by-line estimate.' },
            { title: 'Consistency check', detail: 'The pattern is validated against the declared cause of loss.' },
            { title: 'Draft report', detail: 'The ILA narrative is generated and queued for the assessor.' },
            { title: 'Review & learn', detail: 'The assessor approves or corrects; corrections feed retraining.' },
        ],
        outcomes: [
            'Assessors review a draft instead of authoring one, which is where most of the cycle time goes.',
            'Two identical claims get the same estimate, because the pricing is rules-driven.',
            'Suspicious files surface early rather than after settlement.',
        ],
        audience: ['Insurers', 'TPAs', 'Surveyors & loss assessors'],
        note: 'Detection accuracy improves as the model is fine-tuned on your own claim portfolio — the correction loop is built for exactly that.',
    },
    {
        slug: 'intimation-management',
        name: 'Intimation Management',
        short: 'The claim lifecycle, one console',
        icon: 'workflow',
        accent: '#0B5CD5',
        tagline: 'From first notice of loss to the settled fee bill, in a single tracked pipeline.',
        summary:
            'A claims-handling console that takes an intimation, allocates a surveyor, tracks the survey, moves the file through immediate and final assessment, records the recommendation, and closes out the fee bill — with the document trail attached at every stage.',
        heroPoints: ['FNOL to settlement', 'Surveyor allocation', 'Analytics built in'],
        features: [
            {
                title: 'Intimation capture',
                detail: 'First notice of loss is logged with policy, insured, vehicle, cause of loss and location.',
            },
            {
                title: 'Surveyor allocation',
                detail: 'Assign a surveyor by geography, workload and capability, and track acceptance and turnaround.',
            },
            {
                title: 'Claim handler workspace',
                detail: 'Every open file in one queue, with the current stage and pending action visible at a glance.',
            },
            {
                title: 'ILA and FLA',
                detail: 'Immediate Loss Advice and the Final Loss Assessment, each with its own workflow, approvals and document set.',
            },
            {
                title: 'AI-assisted ILA',
                detail: 'The assessment engine pre-fills the ILA so the handler starts from a draft.',
            },
            {
                title: 'Recommendation & settlement',
                detail: 'Record the settlement recommendation with the reasoning and supporting evidence attached.',
            },
            {
                title: 'Fee bill',
                detail: 'Surveyor fee bills are raised, checked and closed inside the same file.',
            },
            {
                title: 'Document management',
                detail: 'Separate DMS views for surveyor and pre-inspection documents, indexed against the claim.',
            },
            {
                title: 'Claim analytics',
                detail: 'Volumes, ageing, turnaround times and stage-wise bottlenecks on a live dashboard.',
            },
        ],
        steps: [
            { title: 'Intimation', detail: 'FNOL is logged against the policy.' },
            { title: 'Allocation', detail: 'A surveyor is appointed and notified.' },
            { title: 'Survey', detail: 'The capture flow produces the evidence file.' },
            { title: 'ILA', detail: 'Immediate loss advice is drafted and approved.' },
            { title: 'FLA & recommendation', detail: 'Final assessment and the settlement recommendation.' },
            { title: 'Fee bill & closure', detail: 'Surveyor fees settled, file closed.' },
        ],
        outcomes: [
            'No claim sits in someone’s inbox — every file has an owner and a stage.',
            'Turnaround is measured per stage, so the bottleneck is visible instead of assumed.',
            'The audit trail is a by-product of doing the work, not a separate exercise.',
        ],
        audience: ['Insurers', 'TPAs', 'Surveyor firms'],
    },
    {
        slug: 'surveyor-mobile-app',
        name: 'Surveyor Mobile App',
        short: 'Native Android & iOS',
        icon: 'mobile',
        accent: '#22C55E',
        tagline: 'The full survey journey as a native app, built for basements, back lots and bad signal.',
        summary:
            'A native application that runs the same claim journey as the portal, using the device’s own camera, GPS and storage. Photographs are written to the device first and uploaded when there is a connection, so a weak signal in a workshop basement does not cost you the survey.',
        heroPoints: ['Native camera & GPS', 'Captures without signal', 'Same flow as the portal'],
        features: [
            {
                title: 'Native capture',
                detail: 'The device camera, video recorder and location services directly — no browser permission prompts to fight through.',
            },
            {
                title: 'On-device storage',
                detail: 'Photographs and video land on disk as real files, referenced by the claim session.',
            },
            {
                title: 'Orientation-locked capture',
                detail: 'Screens that need landscape lock to landscape, so the framing is consistent across every survey.',
            },
            {
                title: 'On-screen guidance',
                detail: 'A translucent vehicle silhouette over the live preview shows exactly how to frame each angle.',
            },
            {
                title: 'Signature capture',
                detail: 'Customer and inspector declarations are signed with a finger and exported with the file.',
            },
            {
                title: 'Route parity with the portal',
                detail: 'Screen for screen, the app mirrors the web journey — one process to train people on, not two.',
            },
        ],
        steps: [
            { title: 'Install & sign in', detail: 'Workshop or surveyor credentials.' },
            { title: 'Pick up the job', detail: 'Assigned claims appear on the dashboard.' },
            { title: 'Capture on site', detail: 'Documents, guided photos, walk-around video, damage close-ups.' },
            { title: 'Sign off', detail: 'Declarations signed on the device.' },
            { title: 'Submit', detail: 'Sent to the claim handler when there is a connection.' },
        ],
        outcomes: [
            'Surveys complete in poor-coverage locations instead of being abandoned.',
            'Field staff use one consistent process whether they are on a phone or a laptop.',
        ],
        audience: ['Surveyors & loss assessors', 'Workshop staff', 'Field agents'],
    },
    {
        slug: 'partner-network-console',
        name: 'Partner Network Console',
        short: 'Insurers, brokers, surveyors, workshops',
        icon: 'network',
        accent: '#A855F7',
        tagline: 'Every party to a claim, managed from one administrative console.',
        summary:
            'The administrative back office: onboard and manage insurers, brokers, surveyors and repair workshops, create users, control who sees what, and keep the master data behind the claim workflow clean.',
        heroPoints: ['Four partner masters', 'Role-based users', 'Central configuration'],
        features: [
            {
                title: 'Insurer master',
                detail: 'Insurer entities, their branches and the claim configuration that applies to each.',
            },
            {
                title: 'Broker master',
                detail: 'Broker and intermediary records mapped to the business they introduce.',
            },
            {
                title: 'Surveyor master',
                detail: 'Licence details, categories, coverage geography and current workload.',
            },
            {
                title: 'Workshop master',
                detail: 'Garage network with location, capability and the claims routed to each.',
            },
            {
                title: 'User creation & roles',
                detail: 'Create logins with the right role so each user only sees the claims and screens they should.',
            },
            {
                title: 'Configuration & support',
                detail: 'Platform settings in one place, with a support desk view for raised issues.',
            },
        ],
        steps: [
            { title: 'Onboard the partner', detail: 'Insurer, broker, surveyor or workshop record.' },
            { title: 'Create users', detail: 'Logins issued against the partner with a role.' },
            { title: 'Configure', detail: 'Routing rules, categories and defaults.' },
            { title: 'Operate', detail: 'Claims flow to the right party automatically.' },
        ],
        outcomes: [
            'One place to answer “who is handling this claim, and why them”.',
            'Onboarding a new workshop or surveyor is a form, not a deployment.',
        ],
        audience: ['Insurers', 'TPAs', 'Surveyor firms', 'Repair networks'],
    },
    {
        slug: 'non-motor-claims',
        name: 'Non-Motor Claims',
        short: 'Fire, marine, engineering & more',
        icon: 'branches',
        accent: '#14B8A6',
        tagline: 'The same evidence discipline, applied to the other branches of general insurance.',
        summary:
            'Motor is where the platform started, but the underlying machinery — guided capture, geo-stamped evidence, structured assessment, a tracked claim pipeline and a document trail — is branch-agnostic. These lines are delivered on the same foundation with their own checklists and report formats.',
        heroPoints: ['Branch-specific checklists', 'Shared claim pipeline', 'Configurable report formats'],
        branches: [
            {
                name: 'Fire & Property',
                detail: 'Site survey with geo-tagged evidence, salvage assessment and reinstatement costing.',
            },
            {
                name: 'Marine & Transit',
                detail: 'Cargo condition, packing and stowage evidence, shortage and damage assessment at the port or warehouse.',
            },
            {
                name: 'Engineering',
                detail: 'Machinery breakdown, erection all-risks and contractor plant inspections with structured findings.',
            },
            {
                name: 'Health & Personal Accident',
                detail: 'Document-led claim intake, verification and the assessment trail through the same pipeline.',
            },
            {
                name: 'Liability & Miscellaneous',
                detail: 'Third-party and miscellaneous claims handled with configurable checklists and report templates.',
            },
        ],
        features: [
            {
                title: 'Configurable checklists',
                detail: 'Each branch gets its own mandatory evidence list, so the capture flow enforces the right things.',
            },
            {
                title: 'One claim pipeline',
                detail: 'Intimation, allocation, survey, assessment, recommendation and fee bill work the same regardless of branch.',
            },
            {
                title: 'Report templates',
                detail: 'Branch-appropriate survey report formats generated from the structured findings.',
            },
            {
                title: 'Unified reporting',
                detail: 'Portfolio-wide analytics across every branch on one dashboard rather than per-line silos.',
            },
        ],
        steps: [
            { title: 'Pick the branch', detail: 'The checklist and report format follow from it.' },
            { title: 'Capture the evidence', detail: 'Guided, geo-stamped, against that branch’s requirements.' },
            { title: 'Assess', detail: 'Structured findings and costing.' },
            { title: 'Report & settle', detail: 'Branch report generated, recommendation recorded, file closed.' },
        ],
        outcomes: [
            'One platform and one operating process across the general insurance book.',
            'New branches are a configuration exercise rather than a fresh build.',
        ],
        audience: ['Insurers', 'TPAs', 'Surveyor firms', 'Corporates'],
        note: 'Branch coverage is delivered progressively — talk to us about the lines you need first.',
    },
];

export const getSolution = (slug) => SOLUTIONS.find((s) => s.slug === slug);
