import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../data/site';

// =============================================================
// BRAND LOGO
// The mark is the real one, lifted from the product app's
// src/assets/logo.png. That file is a co-branding lockup holding
// TWO logos side by side — New India Assurance (a client) on the
// left and IBima Assist on the right — so only the right-hand
// mark is used here. Carrying a client insurer's logo in this
// site's own chrome would present them as part of this brand.
// scripts/extract-logo.mjs does the extraction and writes:
//   public/logo-ibima.png       full mark, icon over wordmark
//   public/logo-ibima-icon.png  the graphic alone
//   public/favicon.png          the graphic, squared, for the tab
//
// The supplied wordmark is set in dark navy, which disappears on
// the dark navbar and footer. Rather than recolour someone else's
// logo, the icon is paired with an HTML wordmark in the logo's own
// sampled colours (--color-logo-navy / --color-logo-orange), which
// can flip to white on dark. `variant="full"` uses the supplied
// image whole, for light backgrounds with room for it.
// =============================================================

const ICON = '/logo-ibima-icon.png';
const FULL = '/logo-ibima.png';

const BrandLogo = ({ variant = 'dark', className = '', showTagline = false }) => {
    const onDark = variant === 'light';
    const full = variant === 'full';

    return (
        <Link
            to="/"
            className={`group inline-flex min-w-0 items-center gap-2 sm:gap-2.5 ${className}`}
            aria-label={`${BRAND.name} home`}
        >
            {full ? (
                <img
                    src={FULL}
                    alt={BRAND.name}
                    width={203}
                    height={130}
                    className="h-11 w-auto sm:h-12"
                />
            ) : (
                <>
                    <img
                        src={ICON}
                        alt=""
                        width={166}
                        height={85}
                        aria-hidden="true"
                        className="h-7 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-8"
                    />

                    <span className="flex min-w-0 flex-col leading-none">
                        <span className="truncate text-[1.15rem] font-extrabold tracking-tight sm:text-[1.28rem]">
                            <span style={{ color: onDark ? '#ffffff' : 'var(--color-logo-navy)' }}>
                                {BRAND.nameLead}
                            </span>
                            <span style={{ color: 'var(--color-logo-orange)' }}> {BRAND.nameTrail}</span>
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
                </>
            )}
        </Link>
    );
};

export default BrandLogo;
