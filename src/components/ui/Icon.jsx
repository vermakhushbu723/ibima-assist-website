import React from 'react';
import {
    ArrowRight,
    ArrowUpRight,
    Banknote,
    BrainCircuit,
    Building2,
    Camera,
    CarFront,
    ChartColumn,
    Check,
    ChevronDown,
    ClipboardCheck,
    Code2,
    Crosshair,
    FileCheck2,
    FileText,
    Gauge,
    Handshake,
    Headset,
    Layers,
    Lock,
    Mail,
    MapPin,
    Menu,
    Network,
    Phone,
    Radar,
    Route,
    ScanLine,
    Search,
    ShieldCheck,
    Siren,
    Smartphone,
    Sparkles,
    Target,
    TrendingUp,
    Truck,
    UserRoundCog,
    Users,
    Video,
    Wrench,
    X,
    Clock,
    Workflow,
    CircleUser,
} from 'lucide-react';

// =============================================================
// ICONS
// Lucide, so the whole site sits on one properly-drawn icon set
// rather than anything hand-rolled. `src/data/*` refers to icons
// by string key, which keeps JSX out of the data files.
//
// Lucide v1 dropped brand marks, so the three social logos are
// defined below as their real trademarked paths.
// =============================================================

const Linkedin = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
    </svg>
);

const XTwitter = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
    </svg>
);

const Youtube = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81M9.55 15.57V8.43L15.82 12z" />
    </svg>
);

const ICONS = {
    // Solutions
    car: CarFront,
    shield: ShieldCheck,
    ai: BrainCircuit,
    workflow: Workflow,
    mobile: Smartphone,
    network: Network,
    branches: Layers,
    layers: Layers,

    // Audiences
    building: Building2,
    clipboard: ClipboardCheck,
    handshake: Handshake,
    wrench: Wrench,
    user: CircleUser,
    users: Users,
    fleet: Truck,

    // Team / capability
    expertise: UserRoundCog,
    code: Code2,
    support: Headset,

    // Product concepts
    camera: Camera,
    gps: Crosshair,
    scan: ScanLine,
    radar: Radar,
    route: Route,
    video: Video,
    file: FileText,
    fileCheck: FileCheck2,
    chart: ChartColumn,
    gauge: Gauge,
    sparkles: Sparkles,
    trending: TrendingUp,
    target: Target,
    lock: Lock,
    alert: Siren,
    money: Banknote,

    // Contact
    phone: Phone,
    mail: Mail,
    pin: MapPin,
    clock: Clock,

    // UI
    check: Check,
    arrowRight: ArrowRight,
    arrowUpRight: ArrowUpRight,
    chevronDown: ChevronDown,
    search: Search,
    close: X,
    menu: Menu,

    // Brands (filled, not stroked — see note above)
    linkedin: Linkedin,
    twitter: XTwitter,
    youtube: Youtube,
};

// The brand marks are solid shapes, so the stroke props Lucide takes
// would do nothing but add noise to the DOM.
const FILLED = new Set(['linkedin', 'twitter', 'youtube']);

/**
 * @param {string} name key from ICONS
 * @param {string} className sizing / colour utilities
 * @param {number} strokeWidth Lucide stroke weight (ignored by brand marks)
 */
const Icon = ({ name, className = 'w-6 h-6', strokeWidth = 1.75, ...rest }) => {
    const Cmp = ICONS[name] || Check;
    if (FILLED.has(name)) {
        return <Cmp className={className} aria-hidden="true" focusable="false" {...rest} />;
    }
    return (
        <Cmp
            className={className}
            strokeWidth={strokeWidth}
            aria-hidden="true"
            focusable="false"
            {...rest}
        />
    );
};

export default Icon;
