import React from 'react';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero, { HeroPill } from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import SectionBanner from '../components/ui/SectionBanner';
import CTABand from '../components/ui/CTABand';
import { Spotlight } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { BRAND } from '../data/site';
import { getSectionImage, PHOTOS } from '../data/images';
import { DIFFERENTIATORS } from '../data/content';

// The honest before/after. Every "after" row maps to something the
// platform actually enforces — nothing here is aspirational.
const COMPARISON = [
    {
        area: 'Evidence capture',
        before: 'Photographs taken ad hoc and emailed in. Angles vary by whoever held the phone.',
        after: 'A guided journey with an on-screen framing guide for every mandatory angle, per vehicle type.',
    },
    {
        area: 'Provenance',
        before: 'No reliable way to tell when or where an image was taken, or whether it is the right vehicle.',
        after: 'Live in-app capture with GPS and timestamp written in, plus a continuous walk-around video.',
    },
    {
        area: 'Missing items',
        before: 'Discovered by the assessor, days later. Someone drives back out.',
        after: 'Blocked at source — the survey cannot be filed until the manifest is complete.',
    },
    {
        area: 'Assessment',
        before: 'Written from scratch against a rate card, and it varies by assessor.',
        after: 'Parts detected automatically, priced by an auditable rules engine, narrative drafted for review.',
    },
    {
        area: 'Consistency',
        before: 'Two similar claims can end up with materially different estimates.',
        after: 'The same damage produces the same estimate, because the pricing is deterministic.',
    },
    {
        area: 'Fraud signals',
        before: 'Spotted by experience, if at all, and often after settlement.',
        after: 'Damage pattern is tested against the declared cause of loss and mismatches are flagged early.',
    },
    {
        area: 'Tracking',
        before: 'Status lives in an inbox thread and a spreadsheet.',
        after: 'Every file has a stage, an owner and an elapsed time, visible on one dashboard.',
    },
    {
        area: 'Audit',
        before: 'Reconstructed after the fact when someone asks.',
        after: 'A by-product of doing the work — every action is recorded as it happens.',
    },
];

const WhyUsPage = () => {
    usePageMeta(
        'Why Us',
        'Defensible evidence, explainable AI pricing, a workflow designed by claims people, and one platform across every capture channel.',
    );

    const honestyPhoto = getSectionImage('honesty');

    return (
        <>
            <PageHero
                eyebrow="Why us"
                title="Automation is easy. Automation you can defend is the hard part."
                lead="A claim file has to stand up in front of an assessor, an auditor and sometimes an ombudsman. That single constraint shaped every decision in this platform — including the places where we deliberately did not automate."
                photo={PHOTOS.stripped}
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Why Us' }]}
            >
                <div className="mt-8 flex flex-wrap gap-2.5">
                    <HeroPill>Defensible evidence</HeroPill>
                    <HeroPill>Explainable pricing</HeroPill>
                    <HeroPill>Human in the loop</HeroPill>
                </div>
            </PageHero>

            {/* Pillars */}
            <Section tone="light">
                <SectionHeading
                    eyebrow="The four pillars"
                    title="What actually makes the difference"
                    lead="Not features — the design decisions underneath them."
                />

                <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2">
                    {DIFFERENTIATORS.map((d, i) => (
                        <Reveal key={d.title} delay={(i % 2) * 100} from={i % 2 === 0 ? 'left' : 'right'}>
                            <div className="card card-hover group h-full p-5 sm:p-7 lg:p-8">
                                <div className="flex items-start gap-4">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_12px_26px_-12px_rgba(1,160,254,0.9)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                                        <Icon name={d.icon} className="h-5.5 w-5.5" strokeWidth={1.75} />
                                    </span>
                                    <h3 className="pt-1.5 text-lg font-bold text-ink">{d.title}</h3>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-slate-600">{d.detail}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Evidence pair */}
                <div className="mt-8 grid gap-4 xs:grid-cols-2 sm:mt-10">
                    {[
                        {
                            base: PHOTOS.crashFront,
                            alt: 'Close-up of a damaged front end being photographed for a claim',
                            tag: 'Captured',
                            caption: 'Every mandatory angle, framed against a guide and stamped with GPS and time.',
                        },
                        {
                            base: PHOTOS.deskWork,
                            alt: 'Claims handler working through a file at a desk',
                            tag: 'Assessed',
                            caption: 'The handler reviews a priced draft instead of authoring one from scratch.',
                        },
                    ].map((p, i) => (
                        <Reveal key={p.tag} delay={i * 110} from="up">
                            <div className="group overflow-hidden rounded-2xl">
                                <Img base={p.base} alt={p.alt} ratio="aspect-[16/10]" zoom>
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <span className="inline-block rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                                            {p.tag}
                                        </span>
                                        <p className="mt-2.5 text-sm leading-relaxed text-slate-200">{p.caption}</p>
                                    </div>
                                </Img>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* Before / after */}
            <Section tone="muted">
                <SectionHeading
                    eyebrow="Before and after"
                    title="What changes, stage by stage"
                    lead="The left column is how most motor claims are handled today. The right column is what the platform enforces."
                />

                <SectionBanner
                    name="comparison"
                    caption="The difference shows up when someone asks you to prove it"
                    sub="An assessor, an auditor, sometimes an ombudsman — the file has to hold up in front of all three."
                    ratio="aspect-[16/10] xs:aspect-[21/9] sm:aspect-[16/5]"
                    className="mt-10"
                    delay={100}
                />

                <Reveal className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_54px_-32px_rgba(4,20,46,0.4)] sm:mt-12">
                    {/* Column headers — only where there are columns to head */}
                    <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3.5 md:grid">
                        <p className="col-span-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                            Area
                        </p>
                        <p className="col-span-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                            The usual way
                        </p>
                        <p className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                            With {BRAND.name}
                        </p>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {COMPARISON.map((row) => (
                            <div
                                key={row.area}
                                className="grid gap-2.5 px-5 py-4 transition-colors duration-300 hover:bg-brand-50/40 sm:px-6 sm:py-5 md:grid-cols-12 md:gap-4"
                            >
                                <p className="text-sm font-bold text-ink md:col-span-3">{row.area}</p>

                                <div className="flex items-start gap-2.5 md:col-span-4">
                                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-500 sm:mt-1.5">
                                        <Icon name="close" className="h-2.5 w-2.5" strokeWidth={4} />
                                    </span>
                                    <p className="text-[13px] leading-relaxed text-slate-500">
                                        {/* Stacked on phones, so the columns need naming inline */}
                                        <span className="font-semibold uppercase tracking-wider text-slate-400 md:hidden">
                                            Usually:{' '}
                                        </span>
                                        {row.before}
                                    </p>
                                </div>

                                <div className="flex items-start gap-2.5 md:col-span-5">
                                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-500 text-white sm:mt-1.5">
                                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={4} />
                                    </span>
                                    <p className="text-[13px] font-medium leading-relaxed text-slate-700">
                                        <span className="font-semibold uppercase tracking-wider text-brand-600 md:hidden">
                                            With us:{' '}
                                        </span>
                                        {row.after}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </Section>

            {/* What we don't claim */}
            <Section tone="deep">
                <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div className="lg:col-span-5">
                        <SectionHeading
                            tone="deep"
                            align="left"
                            eyebrow="Straight answers"
                            title="What we do not claim"
                            lead="You will hear plenty of numbers in this market. Here is where we would rather be precise than impressive."
                        />

                        <Reveal delay={120} from="left" className="mt-8">
                            <div className="group overflow-hidden rounded-2xl ring-1 ring-white/10">
                                <Img
                                    base={honestyPhoto.base}
                                    alt={honestyPhoto.alt}
                                    ratio="aspect-[4/3]"
                                    zoom
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                                    <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-white">
                                        Look underneath before you quote a number
                                    </p>
                                </Img>
                            </div>
                        </Reveal>
                    </div>

                    <div className="space-y-4 lg:col-span-7">
                        {[
                            {
                                q: 'We do not quote an accuracy figure we have not measured on your data.',
                                a: 'Detection accuracy depends on your vehicle mix and damage profile. We run the model alongside your assessors first, measure it, and show you the real number.',
                            },
                            {
                                q: 'We do not let the model set the price.',
                                a: 'Vision identifies the damaged parts. Costing comes from an auditable rate table and explicit rules, so every line of an estimate can be explained.',
                            },
                            {
                                q: 'We do not remove the assessor.',
                                a: 'The output is a draft. The assessor approves or corrects it — and those corrections are what improve the next version of the model.',
                            },
                            {
                                q: 'We do not promise a go-live date before scoping.',
                                a: 'A weblink capture journey can run quickly. A full deployment with core-system integration takes as long as it takes, and we will tell you honestly.',
                            },
                        ].map((item, i) => (
                            <Reveal key={item.q} delay={i * 90} from="right">
                                <Spotlight className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur transition-transform duration-500 hover:-translate-y-1">
                                    <p className="relative z-10 text-base font-bold text-white">{item.q}</p>
                                    <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-400">
                                        {item.a}
                                    </p>
                                </Spotlight>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>

            <CTABand
                eyebrow="Prove it"
                title="Run it against a batch of your closed claims"
                lead="The fastest way to judge any of this is to point it at files you already know the answer to, and compare. We are happy to do exactly that."
                secondaryLabel="Read the FAQs"
                secondaryTo="/faqs"
            />
        </>
    );
};

export default WhyUsPage;
