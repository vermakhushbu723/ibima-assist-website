import React from 'react';
import Reveal from './Reveal';

/**
 * Page section wrapper. `tone` picks one of the three background
 * treatments used across the site so vertical rhythm and colour
 * alternation stay consistent between pages.
 *
 * Vertical padding comes from the fluid `section-y` utility, so the
 * rhythm scales with the viewport instead of stepping at three
 * breakpoints.
 */
export const Section = ({ tone = 'light', className = '', containerClassName = '', id, children }) => {
    const tones = {
        light: 'bg-white',
        muted: 'bg-slate-50',
        deep: 'surface-deep grid-overlay relative overflow-hidden text-white',
    };

    return (
        <section id={id} className={`section-y ${tones[tone]} ${className}`}>
            <div className={`container-page relative z-10 ${containerClassName}`}>{children}</div>
        </section>
    );
};

/**
 * Eyebrow + heading + optional lead paragraph. `align` handles the
 * centred (marketing) and left-aligned (dense content) variants.
 */
export const SectionHeading = ({
    eyebrow,
    title,
    lead,
    align = 'center',
    tone = 'light',
    className = '',
}) => {
    const dark = tone === 'deep';
    const centred = align === 'center';

    return (
        <Reveal className={`${centred ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
            {eyebrow && (
                <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] sm:px-3.5 sm:tracking-[0.14em] ${
                        dark
                            ? 'bg-white/10 text-brand-200 ring-1 ring-white/15'
                            : 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'
                    }`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-brand-400' : 'bg-brand-500'}`} />
                    {eyebrow}
                </span>
            )}
            <h2
                className={`text-h2 mt-3.5 font-extrabold sm:mt-4 ${dark ? 'text-white' : 'text-ink'}`}
            >
                {title}
            </h2>
            {lead && (
                <p className={`text-lead mt-3.5 sm:mt-4 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {lead}
                </p>
            )}
        </Reveal>
    );
};

export default Section;
