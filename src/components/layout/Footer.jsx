import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import Icon from '../ui/Icon';
import { BRAND, CONTACT, NAV_LINKS, SOCIAL_LINKS } from '../../data/site';
import { SOLUTIONS } from '../../data/solutions';

const FooterHeading = ({ children }) => (
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{children}</h3>
);

const Footer = () => {
    const year = new Date().getFullYear();
    // "Home" is already the logo, so it's dropped from the column.
    const companyLinks = NAV_LINKS.filter((l) => l.to !== '/' && l.to !== '/solutions');

    return (
        <footer className="surface-deep relative overflow-hidden">
            <div className="container-page relative z-10 pb-10 pt-16 sm:pt-20">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
                    {/* Brand block */}
                    <div className="lg:col-span-4">
                        <BrandLogo variant="light" showTagline />
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
                                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 bg-white/5 text-slate-300 transition hover:border-brand-400/50 hover:bg-brand-500/15 hover:text-white"
                                >
                                    <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.7} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="lg:col-span-3">
                        <FooterHeading>Solutions</FooterHeading>
                        <ul className="mt-4 space-y-2.5">
                            {SOLUTIONS.map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        to={`/solutions/${s.slug}`}
                                        className="text-sm text-slate-400 transition hover:text-white"
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
                        <ul className="mt-4 space-y-2.5">
                            {companyLinks.map((l) => (
                                <li key={l.to}>
                                    <Link to={l.to} className="text-sm text-slate-400 transition hover:text-white">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3">
                        <FooterHeading>Get in touch</FooterHeading>
                        <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
                            <li>
                                <a
                                    href={CONTACT.phoneHref}
                                    className="inline-flex items-start gap-2.5 transition hover:text-white"
                                >
                                    <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" strokeWidth={1.7} />
                                    {CONTACT.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={CONTACT.emailHref}
                                    className="inline-flex items-start gap-2.5 transition hover:text-white"
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

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                    <p className="text-xs text-slate-500">
                        © {year} {BRAND.legalName}. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                        {/* TODO: point these at the client's actual policy documents. */}
                        <Link to="/contact" className="transition hover:text-slate-300">
                            Privacy Policy
                        </Link>
                        <Link to="/contact" className="transition hover:text-slate-300">
                            Terms of Use
                        </Link>
                        <Link to="/faqs" className="transition hover:text-slate-300">
                            FAQs
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
