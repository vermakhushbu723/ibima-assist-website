import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../data/site';

// =============================================================
// BRAND LOGO — "iBima Assist"
// Drawn to match the client's wordmark artwork: a lowercase "i"
// built as a figure (orange dot for the head, teal shoulders and
// stem), "Bima" in white on dark / navy on light, and "Assist" in
// teal. Colours are the --color-logo-* tokens in src/index.css,
// sampled from that artwork.
//
// Everything is SVG + live text, so it stays sharp at any size and
// needs no image request. The same mark is used for the favicon
// (public/favicon.svg).
// =============================================================

// The "i": head, shoulders, stem. Its bottom edge sits on the text
// baseline (see Wordmark), so the dot rises above the cap height
// the way it does in the artwork.
export const IMark = ({ className = '' }) => (
    <svg viewBox="0 0 55 136" className={className} aria-hidden="true" focusable="false">
        <circle cx="27.5" cy="16" r="16" fill="var(--color-logo-orange)" />
        <rect x="0" y="40" width="55" height="25" rx="12.5" fill="var(--color-logo-teal)" />
        <rect x="14.5" y="44" width="26" height="92" rx="13" fill="var(--color-logo-teal)" />
    </svg>
);

// "iBima Assist" as one unit. Size it with a font-size class on the
// parent or via `className`; every part scales in em.
export const Wordmark = ({ onDark = false, className = '' }) => (
    <span className={`inline-flex items-baseline whitespace-nowrap leading-none tracking-tight ${className}`} aria-label={BRAND.name}>
        <IMark className="relative top-[0.08em] mr-[0.05em] h-[1.36em] w-auto shrink-0 self-baseline" />
        <span aria-hidden="true" className="font-extrabold" style={{ color: onDark ? '#ffffff' : 'var(--color-logo-navy)' }}>
            {BRAND.nameLead}
        </span>
        <span aria-hidden="true" className="ml-[0.26em] font-bold" style={{ color: 'var(--color-logo-teal)' }}>
            {BRAND.nameTrail}
        </span>
    </span>
);

// `variant`: 'dark' = dark text for light backgrounds, 'light' = for
// dark backgrounds. 'full' is kept for older call sites and behaves
// like 'dark' at a slightly larger size.
const BrandLogo = ({ variant = 'dark', className = '', showTagline = false }) => {
    const onDark = variant === 'light';
    const full = variant === 'full';

    return (
        <Link
            to="/"
            className={`group inline-flex min-w-0 flex-col justify-center leading-none ${className}`}
            aria-label={`${BRAND.name} home`}
        >
            <Wordmark
                onDark={onDark}
                className={`transition-transform duration-300 group-hover:scale-[1.02] ${
                    full ? 'text-[1.45rem]' : 'text-[1.3rem] sm:text-[1.45rem]'
                }`}
            />

            {showTagline && (
                <span
                    className={`mt-2 text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] ${
                        onDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                >
                    {BRAND.tagline}
                </span>
            )}
        </Link>
    );
};

export default BrandLogo;
