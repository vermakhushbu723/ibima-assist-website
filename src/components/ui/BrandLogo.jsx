import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../data/site';

/**
 * Wordmark + monogram. The monogram is a shield (claims / trust)
 * with a capture-frame cut into it, which is the one visual idea
 * the whole product is built around.
 *
 * TODO: swap the SVG for the client's supplied logo file when it
 * arrives — only this component needs to change.
 */
const BrandLogo = ({ variant = 'dark', className = '', showTagline = false }) => {
    const onDark = variant === 'light';

    return (
        <Link
            to="/"
            className={`group inline-flex min-w-0 items-center gap-2 sm:gap-2.5 ${className}`}
            aria-label={`${BRAND.name} home`}
        >
            <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9">
                <svg viewBox="0 0 40 40" className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true">
                    <defs>
                        <linearGradient id="brandmark" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#38b6fb" />
                            <stop offset="55%" stopColor="#01a0fe" />
                            <stop offset="100%" stopColor="#0b5cd5" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M20 3.2 6.4 8.6v11.1c0 8.2 5.6 15.6 13.6 17.6 8-2 13.6-9.4 13.6-17.6V8.6L20 3.2Z"
                        fill="url(#brandmark)"
                    />
                    {/* Capture frame cut-out */}
                    <g stroke="#fff" strokeWidth="1.9" strokeLinecap="round" fill="none" opacity="0.95">
                        <path d="M13.6 16.6v-2.2h2.9" />
                        <path d="M26.4 16.6v-2.2h-2.9" />
                        <path d="M13.6 22.6v2.2h2.9" />
                        <path d="M26.4 22.6v2.2h-2.9" />
                        <circle cx="20" cy="19.6" r="3.4" />
                    </g>
                </svg>
            </span>

            <span className="flex min-w-0 flex-col leading-none">
                <span className="truncate text-[1.15rem] font-extrabold tracking-tight sm:text-[1.28rem]">
                    <span className={onDark ? 'text-white' : 'text-ink'}>{BRAND.nameLead}</span>
                    <span className="text-brand-500">{BRAND.nameTrail}</span>
                </span>
                {showTagline && (
                    <span
                        className={`mt-1 text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] ${
                            onDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                    >
                        {BRAND.tagline}
                    </span>
                )}
            </span>
        </Link>
    );
};

export default BrandLogo;
