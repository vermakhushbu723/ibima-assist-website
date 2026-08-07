import React from 'react';
import { Link } from 'react-router-dom';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero, { HeroPill } from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import CTABand from '../components/ui/CTABand';
import { Spotlight } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { SOLUTIONS } from '../data/solutions';
import SectionBanner from '../components/ui/SectionBanner';
import { getSolutionImage, PHOTOS, PROCESS_IMAGES } from '../data/images';
import { PROCESS } from '../data/content';

const SolutionsPage = () => {
    usePageMeta(
        'Solutions',
        'Guided claim survey capture, pre-inspection, AI damage assessment, intimation management, a native surveyor app, partner network administration and non-motor claims — on one platform.',
    );

    return (
        <>
            <PageHero
                eyebrow="Products & services"
                title="Seven modules that cover a claim end to end"
                lead="Each one solves a specific problem on its own. Together they are a single pipeline — the evidence captured at the scene is the same evidence the assessment engine reads and the console reports on."
                photo={PHOTOS.stripped}
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Solutions' }]}
            >
                <div className="mt-8 flex flex-wrap gap-2.5">
                    <HeroPill>Motor claims</HeroPill>
                    <HeroPill>Pre-inspection</HeroPill>
                    <HeroPill>AI assessment</HeroPill>
                    <HeroPill>Non-motor branches</HeroPill>
                </div>
            </PageHero>

            {/* Where each module sits in the claim lifecycle */}
            <Section tone="light">
                <SectionHeading
                    eyebrow="The pipeline"
                    title="Where each module sits"
                    lead="Read left to right — this is the order a claim actually moves in."
                />

                {/* Horizontal on tablet and up; a plain stack on phones,
                    where a 5-across scroller is more work than it's worth. */}
                <div className="mt-10 -mx-[clamp(1rem,4vw,2rem)] overflow-x-auto px-[clamp(1rem,4vw,2rem)] pb-2 sm:mt-12">
                    <div className="grid gap-3 xs:grid-cols-2 sm:flex sm:min-w-[820px] sm:items-stretch">
                        {PROCESS.map((p, i) => {
                            const photo = PROCESS_IMAGES[i];
                            return (
                                <Reveal key={p.step} delay={i * 90} from="right" className="sm:flex-1">
                                    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 transition-all duration-400 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(4,20,46,0.35)]">
                                        <Img {...photo} ratio="aspect-[16/10]" zoom>
                                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                                            <span className="absolute bottom-2.5 left-3 grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-xs font-bold text-white transition-transform duration-400 group-hover:scale-110">
                                                {p.step}
                                            </span>
                                        </Img>

                                        <div className="flex flex-1 flex-col p-4">
                                            <h3 className="text-sm font-bold text-ink">{p.title}</h3>
                                            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">
                                                {p.detail}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </Section>

            {/* Full catalogue — alternating rows */}
            <Section tone="muted">
                <SectionHeading
                    eyebrow="The catalogue"
                    title="Every module, in detail"
                    lead="Open any of these for the full feature list, the step-by-step flow and what it changes operationally."
                />

                <SectionBanner
                    name="pipeline"
                    caption="Seven modules, one road through the claim"
                    sub="Each one solves a problem on its own; together they are a single pipeline with no hand-offs to lose things in."
                    ratio="aspect-[16/10] xs:aspect-[21/9] sm:aspect-[16/5]"
                    className="mt-10"
                    delay={100}
                />

                <div className="mt-14 space-y-6">
                    {SOLUTIONS.map((s, i) => {
                        const photo = getSolutionImage(s.slug);
                        return (
                        <Reveal key={s.slug} delay={40} from={i % 2 === 0 ? 'left' : 'right'}>
                            <article className="card card-hover group overflow-hidden">
                                <div
                                    className={`grid gap-0 lg:grid-cols-12 ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
                                >
                                    {/* Photo panel */}
                                    <div className="relative lg:col-span-5 lg:[direction:ltr]">
                                        <Img
                                            {...photo}
                                            ratio="aspect-[16/10] lg:aspect-auto lg:h-full"
                                            zoom
                                            className="h-full"
                                        >
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(150deg, ${s.accent}55 0%, rgba(4,20,46,0.72) 78%)`,
                                                }}
                                            />
                                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                <span
                                                    className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110"
                                                    style={{
                                                        background: s.accent,
                                                        boxShadow: `0 18px 34px -16px ${s.accent}`,
                                                    }}
                                                >
                                                    <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.7} />
                                                </span>

                                                <div className="mt-4 flex flex-wrap gap-1.5">
                                                    {s.heroPoints.map((h) => (
                                                        <span
                                                            key={h}
                                                            className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
                                                        >
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Img>
                                    </div>

                                    {/* Copy */}
                                    <div className="p-5 xs:p-7 lg:col-span-7 lg:p-9 lg:[direction:ltr]">
                                        <h3 className="text-h3 font-extrabold tracking-tight text-ink">{s.name}</h3>
                                        <p className="mt-2 text-[13px] font-medium sm:text-sm" style={{ color: s.accent }}>
                                            {s.tagline}
                                        </p>
                                        <p className="mt-3.5 text-[13px] leading-relaxed text-slate-600 sm:mt-4 sm:text-sm">
                                            {s.summary}
                                        </p>

                                        <ul className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2">
                                            {s.features.slice(0, 4).map((f) => (
                                                <li key={f.title} className="flex items-start gap-2.5">
                                                    <Icon
                                                        name="check"
                                                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                                                        strokeWidth={2.6}
                                                    />
                                                    <span className="text-[13px] font-medium text-slate-700">
                                                        {f.title}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-7">
                                            <Link
                                                to={`/solutions/${s.slug}`}
                                                className="sheen inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-900"
                                            >
                                                Full details
                                                <Icon
                                                    name="arrowRight"
                                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                                    strokeWidth={2.1}
                                                />
                                            </Link>
                                            <span className="text-xs text-slate-500">
                                                For {s.audience.join(' · ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Reveal>
                        );
                    })}
                </div>
            </Section>

            {/* Deployment reassurance band */}
            <Section tone="deep">
                <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <Reveal from="left" className="lg:col-span-6">
                        <div className="overflow-hidden rounded-2xl">
                            <Img
                                base={PHOTOS.workshopFloor}
                                alt="Technician working beside an open car door on a workshop floor"
                                ratio="aspect-[4/3]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-ink/60 to-transparent" />
                            </Img>
                        </div>
                    </Reveal>

                    <div className="lg:col-span-6">
                        <SectionHeading
                            tone="deep"
                            align="left"
                            eyebrow="Modular by design"
                            title="Start with one module. Add the rest when it earns its place."
                            lead="Nothing here demands a big-bang rollout. Each module produces structured data the next one can read, so adding a second is configuration rather than migration."
                        />

                        <div className="mt-7 grid gap-3 xs:grid-cols-2 sm:mt-8">
                            {[
                                { icon: 'route', label: 'No forced sequence' },
                                { icon: 'lock', label: 'Role-scoped access' },
                                { icon: 'fileCheck', label: 'Shared claim record' },
                                { icon: 'trending', label: 'One reporting layer' },
                            ].map((f, i) => (
                                <Reveal key={f.label} delay={i * 90} from="right">
                                    <Spotlight className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur">
                                        <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/30">
                                            <Icon name={f.icon} className="h-4 w-4" strokeWidth={1.8} />
                                        </span>
                                        <span className="relative z-10 text-sm font-medium text-slate-200">
                                            {f.label}
                                        </span>
                                    </Spotlight>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            <CTABand
                eyebrow="Next step"
                title="Pick the module that hurts most today"
                lead="You do not have to take the whole platform on day one. Tell us where claims are getting stuck and we will start there."
                secondaryLabel="Read the FAQs"
                secondaryTo="/faqs"
            />
        </>
    );
};

export default SolutionsPage;
