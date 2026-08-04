// =============================================================
// SITE-WIDE CONFIGURATION
// Brand name, navigation and contact details live here so they
// can be re-pointed in one place. Anything marked TODO is a
// placeholder the client still has to confirm.
// =============================================================

export const BRAND = {
    name: 'IBima Assist',
    // Split for the two-tone wordmark in <BrandLogo />.
    nameLead: 'IBima',
    nameTrail: 'Assist',
    tagline: 'Claims, digitised end to end',
    legalName: 'IBima Assist Technologies', // TODO: confirm registered entity name
    established: 2018,
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
