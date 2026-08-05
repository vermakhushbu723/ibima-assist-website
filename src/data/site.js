// =============================================================
// SITE-WIDE CONFIGURATION
// Brand name, navigation and contact details live here so they
// can be re-pointed in one place. Anything marked TODO is a
// placeholder the client still has to confirm.
// =============================================================

export const BRAND = {
    // The public-facing product name.
    name: 'IBima Assist',
    // Split for the two-tone wordmark in <BrandLogo />.
    nameLead: 'IBima',
    nameTrail: 'Assist',
    tagline: 'Claims, digitised end to end',
    // The company that owns and operates the platform. Shown as
    // "Powered by …" in the header strip and throughout the footer.
    operator: 'VroomSync Expertise Pvt Ltd',
    operatorShort: 'VroomSync Expertise',
    established: 2018,
};

// =============================================================
// LEGAL / DECLARATIONS
// Rendered in the footer's legal band on every page.
// TODO: the registration identifiers below are placeholders —
// replace with VroomSync Expertise Pvt Ltd's actual CIN, GSTIN
// and registered address before the site goes live.
// =============================================================
export const LEGAL = {
    cin: 'CIN: U00000XX0000PTC000000',
    gstin: 'GSTIN: 00XXXXX0000X0XX',
    // Short line under the wordmark and in the footer bottom bar.
    ownership: `${BRAND.name} is a product of ${BRAND.operator}.`,

    declarations: [
        {
            title: 'Ownership & trademarks',
            body: `“${BRAND.name}” and the ${BRAND.name} mark are trademarks of ${BRAND.operator}. All software, source code, designs, interfaces, workflows, documentation and assessment models forming part of the platform are the exclusive intellectual property of ${BRAND.operator} and are protected under applicable copyright and trademark law.`,
        },
        {
            title: 'Nature of services',
            body: `${BRAND.operator} is a technology and claims-services provider. It is not an insurance company, insurance broker or corporate agent, does not underwrite risk, does not sell or solicit insurance policies, and does not decide the admissibility or quantum of any claim. All underwriting and settlement decisions rest solely with the insurer and its authorised assessors.`,
        },
        {
            title: 'Assessment outputs',
            body: 'Damage detection, severity grading and cost estimates produced by the platform are decision-support outputs intended for review by a qualified surveyor or loss assessor. They do not constitute a survey report, a loss assessment, or an offer of settlement, and must not be relied upon as such without that review.',
        },
        {
            title: 'Data & privacy',
            body: 'Claim data, photographs, location metadata and personal information processed through the platform are handled on behalf of the contracting insurer or intermediary in accordance with applicable Indian data-protection law and the terms of the relevant services agreement. Access is role-restricted and every action is logged.',
        },
        {
            title: 'Third-party marks',
            body: 'Insurer, broker, workshop and other third-party names or marks referenced anywhere on this site remain the property of their respective owners and are used for identification purposes only. Their use does not imply endorsement, partnership or affiliation unless expressly stated.',
        },
        {
            title: 'Content on this site',
            body: 'Information on this website is provided for general information about the platform and its capabilities. It does not form part of any contract, quotation or warranty. Features, specifications and availability may change without notice.',
        },
    ],

    // Bottom-bar links. TODO: point at the real policy documents once
    // they exist — they currently route to the contact page.
    policies: [
        { label: 'Privacy Policy', to: '/contact' },
        { label: 'Terms of Use', to: '/contact' },
        { label: 'Cookie Policy', to: '/contact' },
        { label: 'Disclaimer', to: '/contact' },
        { label: 'Grievance Redressal', to: '/contact' },
    ],
};

export const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Solutions', to: '/solutions' },
    { label: 'Why Us', to: '/why-us' },
    { label: 'Our Team', to: '/team' },
    { label: 'FAQs', to: '/faqs' },
    { label: 'Contact', to: '/contact' },
];

// TODO: replace every value below with the client's real details.
export const CONTACT = {
    phone: '+91 00000 00000',
    phoneHref: 'tel:+910000000000',
    email: 'info@ibimaassist.in',
    emailHref: 'mailto:info@ibimaassist.in',
    sales: 'sales@ibimaassist.in',
    salesHref: 'mailto:sales@ibimaassist.in',
    registeredOffice: {
        label: 'Registered Office',
        lines: ['Address line 1', 'Address line 2', 'New Delhi - 110000'],
    },
    operationsOffice: {
        label: 'Operations Centre',
        lines: ['Address line 1', 'Address line 2', 'Delhi - 110000'],
    },
    hours: [
        { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM IST' },
        { days: 'Saturday', time: '10:00 AM – 2:00 PM IST' },
        { days: 'Sunday', time: 'Closed' },
    ],
    // Claim-capture links run 24×7 even when the office is shut.
    supportNote: 'Weblink capture and the surveyor app stay available 24×7.',
};

export const SOCIAL_LINKS = [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'X', href: '#', icon: 'twitter' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
];

// Where the "Login" / "Launch app" buttons point. Update these to
// the deployed product URLs once they are live.
export const APP_LINKS = {
    portal: '#', // TODO: URL of the deployed claim portal (/) landing screen
    admin: '#', // TODO: URL of the admin console (/admin)
    androidApp: '#', // TODO: Play Store listing
    iosApp: '#', // TODO: App Store listing
};
