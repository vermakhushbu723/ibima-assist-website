import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Img from './Img';
import Reveal from './Reveal';

/**
 * Compact dark hero used at the top of every inner page, so all
 * of them open the same way. The home page has its own, larger
 * hero instead.
 *
 * @param {string} photo Unsplash base from src/data/images.js — sits
 *                       behind the copy, heavily darkened.
 */
const PageHero = ({ eyebrow, title, lead, breadcrumb = [], photo, children }) => (
    <section className="surface-deep grid-overlay relative overflow-hidden">
        {photo && (
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <Img
                    base={photo}
                    alt=""
                    ratio="h-full w-full"
                    width={1600}
                    priority
                    className="h-full w-full"
                    imgClassName="ken-burns opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
            </div>
        )}

        {/* Top padding clears the fixed navbar (3.5rem / 4rem / 4.5rem
            tall by breakpoint) with a small breathing gap — no more. */}
        <div className="container-page relative z-10 pb-10 pt-22 xs:pt-24 sm:pb-14 sm:pt-26 lg:pb-16 lg:pt-28">
            <Reveal className="max-w-3xl">
                {breadcrumb.length > 0 && (
                    <nav
                        aria-label="Breadcrumb"
                        className="mb-4 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-400 sm:mb-5"
                    >
                        {breadcrumb.map((crumb, i) => (
                            <span key={crumb.label} className="inline-flex items-center gap-1.5">
                                {i > 0 && <span className="text-slate-600">/</span>}
                                {crumb.to ? (
                                    <Link to={crumb.to} className="inline-block py-1.5 transition hover:text-brand-300">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="py-1.5 text-slate-300">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}

                {eyebrow && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-200 ring-1 ring-white/15 sm:px-3.5 sm:tracking-[0.14em]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                        {eyebrow}
                    </span>
                )}

                <h1 className="text-h1 mt-3.5 font-extrabold text-white sm:mt-4">{title}</h1>

                {lead && <p className="text-lead mt-4 max-w-2xl text-slate-300 sm:mt-5">{lead}</p>}

                {children}
            </Reveal>
        </div>

        {/* Soft fade into the page below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white/5" />
    </section>
);

export const HeroPill = ({ children }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-200 backdrop-blur transition-all duration-300 hover:border-brand-400/50 hover:bg-brand-500/10">
        <Icon name="check" className="h-3.5 w-3.5 text-brand-400" strokeWidth={2.4} />
        {children}
    </span>
);

export default PageHero;
