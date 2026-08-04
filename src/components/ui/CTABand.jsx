import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Img from './Img';
import Reveal from './Reveal';
import { CONTACT } from '../../data/site';
import { PHOTOS } from '../../data/images';

/**
 * The closing call-to-action used at the foot of every page.
 * Kept in one component so the ask stays identical site-wide.
 */
const CTABand = ({
    eyebrow = 'Get started',
    title = 'See it running on your own claims',
    lead = 'Bring us a handful of recent files and we will walk you through the capture journey, the assessment output and the console — with your data, not a canned demo.',
    primaryLabel = 'Book a walkthrough',
    primaryTo = '/contact',
    secondaryLabel = 'Explore the solutions',
    secondaryTo = '/solutions',
}) => (
    <section className="surface-deep grid-overlay relative overflow-hidden">
        {/* Photographic backdrop, pushed well back behind the copy */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Img
                base={PHOTOS.teamInspect}
                alt=""
                ratio="h-full w-full"
                width={1600}
                className="h-full w-full"
                imgClassName="ken-burns opacity-[0.13]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />
        </div>

        <div className="container-page relative z-10 py-16 sm:py-20">
            <Reveal className="mx-auto max-w-4xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200 ring-1 ring-white/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                    {eyebrow}
                </span>

                <h2 className="mt-5 text-3xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[2.7rem]">
                    {title}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                    {lead}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        to={primaryTo}
                        className="sheen group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(1,160,254,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400 sm:w-auto"
                    >
                        {primaryLabel}
                        <Icon
                            name="arrowRight"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            strokeWidth={2}
                        />
                    </Link>
                    <Link
                        to={secondaryTo}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:w-auto"
                    >
                        {secondaryLabel}
                    </Link>
                </div>

                <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
                    <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 transition hover:text-white">
                        <Icon name="phone" className="h-4 w-4" strokeWidth={1.7} />
                        {CONTACT.phone}
                    </a>
                    <a href={CONTACT.emailHref} className="inline-flex items-center gap-2 transition hover:text-white">
                        <Icon name="mail" className="h-4 w-4" strokeWidth={1.7} />
                        {CONTACT.email}
                    </a>
                </p>
            </Reveal>
        </div>
    </section>
);

export default CTABand;
