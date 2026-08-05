import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import Icon from '../ui/Icon';
import Reveal from '../ui/Reveal';
import { BRAND, CONTACT, LEGAL, NAV_LINKS, SOCIAL_LINKS } from '../../data/site';
import { SOLUTIONS } from '../../data/solutions';

const FooterHeading = ({ children }) => (
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{children}</h3>
);

/**
 * The declarations block. Six paragraphs of legal text would bury
 * the contact details on a phone, so below `sm` it collapses behind
 * a real disclosure button; from `sm` up it is always visible and
 * the heading is a plain heading.
 *
 * The breakpoint is read in JS rather than faked with CSS so that
 * `aria-expanded` never claims "collapsed" while the content is on
 * screen — screen readers would be told the opposite of the truth.
 */
const Declarations = () => {
    const [collapsible, setCollapsible] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 639px)');
        const sync = () => setCollapsible(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    const shown = !collapsible || open;

    return (
        <div className="mt-12 border-t border-white/10 pt-8">
            {collapsible ? (
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="footer-declarations"
                    className="flex w-full items-center justify-between gap-3 py-1.5 text-left"
                >
                    <FooterHeading>Declarations &amp; rights</FooterHeading>
                    <Icon
                        name="chevronDown"
                        className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${
                            open ? 'rotate-180' : ''
                        }`}
                        strokeWidth={2.2}
                    />
                </button>
            ) : (
                <FooterHeading>Declarations &amp; rights</FooterHeading>
            )}

            <div
                id="footer-declarations"
                hidden={!shown}
                className="mt-5 grid gap-x-8 gap-y-5 md:grid-cols-2 xl:grid-cols-3"
            >
                {LEGAL.declarations.map((d) => (
                    <div key={d.title}>
                        <h4 className="text-[13px] font-semibold text-slate-200">{d.title}</h4>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{d.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Footer = () => {
    const year = new Date().getFullYear();
    // "Home" is already the logo, and Solutions has its own column.
    const companyLinks = NAV_LINKS.filter((l) => l.to !== '/' && l.to !== '/solutions');

    return (
        <footer className="surface-deep relative overflow-hidden">
            <div className="container-page relative z-10 pb-8 pt-14 sm:pb-10 sm:pt-16 lg:pt-20">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand block */}
                    <div className="sm:col-span-2 lg:col-span-4">
                        <BrandLogo variant="light" showTagline />

                        <p className="mt-3 text-xs font-medium text-slate-400">
                            Powered by{' '}
                            <span className="text-brand-300">{BRAND.operator}</span>
                        </p>

                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                            Claims technology for insurers, brokers, surveyors and repair networks — guided evidence
                            capture at the scene, AI-assisted damage assessment, and one console that carries a file
                            from first notice of loss to settlement.
                        </p>

                        <div className="mt-6 flex items-center gap-2.5">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/50 hover:bg-brand-500/15 hover:text-white"
                                >
                                    <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.7} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="lg:col-span-3">
                        <FooterHeading>Solutions</FooterHeading>
                        {/* space-y-1 plus py-1 on each link keeps the visual
                            rhythm while giving every link a ~28px tap target. */}
                        <ul className="mt-3 space-y-1">
                            {SOLUTIONS.map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        to={`/solutions/${s.slug}`}
                                        className="inline-block py-1 text-sm text-slate-400 transition-colors hover:text-white"
                                    >
                                        {s.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="lg:col-span-2">
                        <FooterHeading>Company</FooterHeading>
                        {/* space-y-1 plus py-1 on each link keeps the visual
                            rhythm while giving every link a ~28px tap target. */}
                        <ul className="mt-3 space-y-1">
                            {companyLinks.map((l) => (
                                <li key={l.to}>
                                    <Link
                                        to={l.to}
                                        className="inline-block py-1 text-sm text-slate-400 transition-colors hover:text-white"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="sm:col-span-2 lg:col-span-3">
                        <FooterHeading>Get in touch</FooterHeading>
                        <ul className="mt-4 grid gap-3.5 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-1">
                            <li>
                                <a
                                    href={CONTACT.phoneHref}
                                    className="inline-flex items-start gap-2.5 py-1 transition-colors hover:text-white"
                                >
                                    <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} />
                                    {CONTACT.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={CONTACT.emailHref}
                                    className="inline-flex items-start gap-2.5 break-all py-1 transition-colors hover:text-white"
                                >
                                    <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} />
                                    {CONTACT.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} />
                                <span>
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        {CONTACT.registeredOffice.label}
                                    </span>
                                    {CONTACT.registeredOffice.lines.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} />
                                <span>
                                    {CONTACT.hours.map((h) => (
                                        <span key={h.days} className="block">
                                            {h.days}: {h.time}
                                        </span>
                                    ))}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Declarations & rights */}
                <Reveal from="up">
                    <Declarations />
                </Reveal>

                {/* Bottom bar */}
                <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="text-xs leading-relaxed text-slate-500">
                            <p>
                                © {year} <span className="text-slate-400">{BRAND.operator}</span>. All rights reserved.
                            </p>
                            <p className="mt-1">{LEGAL.ownership}</p>
                            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                                <span>{LEGAL.cin}</span>
                                <span>{LEGAL.gstin}</span>
                            </p>
                        </div>

                        <nav
                            aria-label="Legal"
                            className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 lg:justify-end"
                        >
                            {LEGAL.policies.map((p) => (
                                <Link
                                    key={p.label}
                                    to={p.to}
                                    className="py-1 transition-colors hover:text-slate-300"
                                >
                                    {p.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
