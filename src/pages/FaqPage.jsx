import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Input } from 'antd';
import AntdScope from '../theme/AntdScope';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import SectionBanner from '../components/ui/SectionBanner';
import CTABand from '../components/ui/CTABand';
import usePageMeta from '../hooks/usePageMeta';
import { FAQS } from '../data/content';
import { PHOTOS } from '../data/images';
import { CONTACT } from '../data/site';

const FaqPage = () => {
    usePageMeta(
        'FAQs',
        'Common questions about claim capture, AI damage assessment accuracy, non-motor branches, integration, security, deployment timelines and pricing.',
    );

    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return FAQS;
        return FAQS.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q));
    }, [query]);

    const items = filtered.map((f, i) => ({
        key: String(i),
        label: <span className="text-[15px] font-semibold text-ink">{f.q}</span>,
        children: <p className="pr-2 text-sm leading-relaxed text-slate-600">{f.a}</p>,
    }));

    return (
        <>
            <PageHero
                eyebrow="FAQs"
                title="The questions we actually get asked"
                lead="Short, direct answers — including the ones where the honest answer is “it depends, and here is what it depends on”."
                photo={PHOTOS.questionMark}
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]}
            />

            <Section tone="light">
                <SectionBanner
                    name="faq"
                    caption="Real answers, from people who handle real claims"
                    sub="Including the ones where the honest answer is “it depends” — and what it depends on."
                    ratio="aspect-[16/10] xs:aspect-[21/9] sm:aspect-[16/5]"
                    className="mx-auto mb-10 max-w-3xl"
                />

                <AntdScope>
                    <div className="mx-auto max-w-3xl">
                        <Reveal>
                        <Input
                            size="large"
                            allowClear
                            placeholder="Search the FAQs…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            prefix={<Icon name="search" className="h-4 w-4 text-slate-400" strokeWidth={1.9} />}
                        />
                    </Reveal>

                    <Reveal delay={80} className="mt-8">
                        {items.length > 0 ? (
                            <Collapse
                                className="site-faq"
                                ghost
                                accordion
                                expandIconPlacement="end"
                                defaultActiveKey={['0']}
                                items={items}
                            />
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                                <p className="text-sm text-slate-500">
                                    Nothing matched &ldquo;{query}&rdquo;.
                                </p>
                                <Link
                                    to="/contact"
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
                                >
                                    Ask us directly
                                    <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2.1} />
                                </Link>
                            </div>
                        )}
                        </Reveal>
                    </div>
                </AntdScope>
            </Section>

            {/* Still stuck */}
            <Section tone="muted">
                <SectionHeading
                    eyebrow="Still not answered?"
                    title="Pick the shortest route to a real answer"
                />

                <SectionBanner
                    name="support"
                    caption="Someone is actually at the other end"
                    sub="No call centre script, no ticket black hole — you get a person who can answer."
                    ratio="aspect-[16/10] xs:aspect-[21/9] sm:aspect-[16/5]"
                    align="center"
                    className="mx-auto mt-10 max-w-4xl"
                    delay={100}
                />

                <div className="mx-auto mt-10 grid max-w-4xl gap-4 xs:grid-cols-2 sm:mt-12 sm:gap-5 md:grid-cols-3">
                    {[
                        {
                            icon: 'phone',
                            title: 'Call us',
                            body: CONTACT.phone,
                            href: CONTACT.phoneHref,
                            sub: 'During business hours',
                        },
                        {
                            icon: 'mail',
                            title: 'Email us',
                            body: CONTACT.email,
                            href: CONTACT.emailHref,
                            sub: 'We reply the same working day',
                        },
                        {
                            icon: 'clipboard',
                            title: 'Book a demo',
                            body: 'Send us your requirement',
                            to: '/contact',
                            sub: 'Walkthrough on your own claims',
                        },
                    ].map((c, i) => {
                        const inner = (
                            <>
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                                    <Icon name={c.icon} className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <h3 className="mt-4 text-base font-bold text-ink">{c.title}</h3>
                                <p className="mt-1 break-all text-sm font-medium text-brand-600">{c.body}</p>
                                <p className="mt-1.5 text-xs text-slate-500">{c.sub}</p>
                            </>
                        );

                        // Three cards in a two-column grid leaves an orphan, so
                        // the last one spans both until md gives it a column.
                        return (
                            <Reveal
                                key={c.title}
                                delay={i * 90}
                                className="xs:last:col-span-2 md:last:col-span-1"
                            >
                                {c.to ? (
                                    <Link to={c.to} className="card card-hover flex h-full flex-col p-5 sm:p-6">
                                        {inner}
                                    </Link>
                                ) : (
                                    <a href={c.href} className="card card-hover flex h-full flex-col p-5 sm:p-6">
                                        {inner}
                                    </a>
                                )}
                            </Reveal>
                        );
                    })}
                </div>
            </Section>

            <CTABand />
        </>
    );
};

export default FaqPage;
