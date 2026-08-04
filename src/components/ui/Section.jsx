import React from 'react';
import Reveal from './Reveal';

/**
 * Page section wrapper. `tone` picks one of the three background
 * treatments used across the site so vertical rhythm and colour
 * alternation stay consistent between pages.
 */
export const Section = ({ tone = 'light', className = '', containerClassName = '', id, children }) => {
    const tones = {
        light: 'bg-white',
        muted: 'bg-slate-50',
        deep: 'surface-deep grid-overlay relative overflow-hidden text-white',
    };

    return (
        <section id={id} className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
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
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${
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
                className={`mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.12] ${
                    dark ? 'text-white' : 'text-ink'
                }`}
            >
                {title}
            </h2>
            {lead && (
                <p
                    className={`mt-4 text-base sm:text-lg leading-relaxed ${
                        dark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                >
                    {lead}
                </p>
            )}
        </Reveal>
    );
};

export default Section;
