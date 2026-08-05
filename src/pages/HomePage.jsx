import React from 'react';
import { Link } from 'react-router-dom';
import Section, { SectionHeading } from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import StatCounter from '../components/ui/StatCounter';
import PlatformVisual from '../components/ui/PlatformVisual';
import CTABand from '../components/ui/CTABand';
import { Parallax, Spotlight, WordReveal } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { SOLUTIONS } from '../data/solutions';
import { getSolutionImage, PHOTOS } from '../data/images';
import { AUDIENCES, CAPABILITY_STRIP, DIFFERENTIATORS, PROCESS, STATS } from '../data/content';

// ── Hero ────────────────────────────────────────────────────────
const Hero = () => (
    <section className="surface-deep grid-overlay relative overflow-hidden">
        {/* Photographic backdrop, heavily darkened so the copy stays legible */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <Img
                base={PHOTOS.crashFront}
                alt=""
                ratio="h-full w-full"
                width={1600}
                priority
                className="h-full w-full"
                imgClassName="ken-burns opacity-[0.16]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
        </div>

        {/* Top padding clears the fixed navbar (3.5rem / 4rem / 4.5rem
            tall by breakpoint) with a small breathing gap — no more. */}
        <div className="container-page relative z-10 grid items-center gap-10 pb-16 pt-22 xs:pt-24 sm:gap-14 sm:pb-24 sm:pt-26 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-28">
            {/* Copy */}
            <div className="lg:col-span-6">
                <Reveal from="left">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-200 ring-1 ring-white/15 sm:px-3.5 sm:tracking-[0.14em]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
                        Claims-as-a-Service platform
                    </span>
                </Reveal>

                <h1 className="text-display mt-5 font-extrabold text-white sm:mt-6">
                    <WordReveal text="Motor claims," />{' '}
                    <span className="text-gradient">
                        <WordReveal text="settled on evidence" delay={180} />
                    </span>{' '}
                    <WordReveal text="— not on guesswork." delay={420} />
                </h1>

                <Reveal delay={180} from="left">
                    <p className="text-lead mt-5 max-w-xl text-slate-300 sm:mt-6">
                        We put a disciplined capture process in the hands of whoever is standing next to the vehicle,
                        an AI assessment engine behind whoever has to price the loss, and one console that carries the
                        file from first notice of loss to settlement.
                    </p>
                </Reveal>

                <Reveal delay={260} from="left">
                    <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                        <Link
                            to="/contact"
                            className="sheen group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_44px_-16px_rgba(1,160,254,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-400"
                        >
                            Book a walkthrough
                            <Icon
                                name="arrowRight"
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                strokeWidth={2.1}
                            />
                        </Link>
                        <Link
                            to="/solutions"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                        >
                            Explore the solutions
                        </Link>
                    </div>
                </Reveal>

                <Reveal delay={340} from="up">
                    <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/10 pt-6 sm:mt-10 sm:gap-x-6 sm:gap-y-3 sm:pt-7">
                        {['Motor & non-motor claims', 'Web, weblink and native app', 'Built for Indian general insurance'].map(
                            (point) => (
                                <span
                                    key={point}
                                    className="inline-flex items-center gap-2 text-[13px] text-slate-300 sm:text-sm"
                                >
                                    <Icon name="check" className="h-4 w-4 shrink-0 text-brand-400" strokeWidth={2.6} />
                                    {point}
                                </span>
                            ),
                        )}
                    </div>
                </Reveal>
            </div>

            {/* Visual */}
            <Reveal delay={200} from="scale" className="lg:col-span-6">
                <Parallax speed={0.06}>
                    <PlatformVisual className="mt-2 lg:mt-0" />
                </Parallax>
            </Reveal>
        </div>

        {/* Capability marquee */}
        <div className="relative z-10 border-t border-white/10 bg-black/25 py-3.5 backdrop-blur-sm sm:py-4">
            <div className="marquee-mask overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
                <div className="marquee-track">
                    {[...CAPABILITY_STRIP, ...CAPABILITY_STRIP].map((item, i) => (
                        <span
                            key={`${item}-${i}`}
                            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-4 text-[13px] font-medium text-slate-400 sm:gap-2.5 sm:px-6 sm:text-sm"
                        >
                            <span className="h-1 w-1 rounded-full bg-brand-400" />
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// ── Stats ───────────────────────────────────────────────────────
const Stats = () => (
    <section className="relative z-20 bg-white pt-12 sm:pt-16">
        <div className="container-page">
            <div className="grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_28px_60px_-32px_rgba(4,20,46,0.4)] xs:grid-cols-2 xs:divide-y-0 sm:p-3 lg:grid-cols-4 lg:divide-x">
                {STATS.map((s, i) => (
                    <Reveal
                        key={s.label}
                        delay={i * 90}
                        from="scale"
                        className="px-4 py-4 text-center sm:py-5 lg:px-6"
                    >
                        <p className="text-2xl font-extrabold tracking-tight text-ink xs:text-3xl sm:text-4xl">
                            <StatCounter value={s.value} suffix={s.suffix} />
                        </p>
                        <p className="mt-1.5 text-[13px] font-semibold text-brand-600 sm:text-sm">{s.label}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.sub}</p>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

// ── What we do ──────────────────────────────────────────────────
const Intro = () => (
    <Section tone="light" className="pt-14 sm:pt-16">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-5">
                <SectionHeading
                    align="left"
                    eyebrow="What we do"
                    title="Claims-as-a-Service, from the scene to the settlement"
                    lead="Most claim delays are not decision delays. They are evidence delays — a photograph taken from the wrong angle, a missing document, an estimate that has to be re-argued. We fix that at the point of capture, then automate everything downstream of it."
                />

                <Reveal delay={140} from="left">
                    <Link
                        to="/about"
                        className="group mt-6 inline-flex items-center gap-2 py-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
                    >
                        More about the company
                        <Icon
                            name="arrowRight"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                            strokeWidth={2.1}
                        />
                    </Link>
                </Reveal>

                {/* Supporting photograph */}
                <Reveal delay={220} from="up" className="mt-9">
                    <div className="group relative overflow-hidden rounded-2xl">
                        <Img
                            base={PHOTOS.inspection}
                            alt="Surveyor inspecting a vehicle’s panels with a hand lamp"
                            ratio="aspect-[16/10]"
                            zoom
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <p className="text-sm font-semibold text-white">Evidence captured at the scene</p>
                                <p className="mt-1 text-xs text-slate-300">
                                    Guided, geo-stamped, and complete before anyone leaves the vehicle
                                </p>
                            </div>
                        </Img>
                    </div>
                </Reveal>
            </div>

            <div className="lg:col-span-7">
                <div className="grid gap-4 xs:grid-cols-2">
                    {[
                        {
                            icon: 'camera',
                            title: 'Capture',
                            detail: 'A guided journey that will not let a survey be filed until every mandatory angle, document and declaration is there.',
                        },
                        {
                            icon: 'ai',
                            title: 'Assess',
                            detail: 'Segmentation finds the damaged parts, a rules engine prices them, and the assessment narrative drafts itself.',
                        },
                        {
                            icon: 'workflow',
                            title: 'Process',
                            detail: 'Intimation, surveyor allocation, ILA, FLA, recommendation and fee bill — one tracked pipeline with an owner at every stage.',
                        },
                        {
                            icon: 'chart',
                            title: 'Measure',
                            detail: 'Stage-wise turnaround, ageing and volume across the whole book, live rather than in a month-end spreadsheet.',
                        },
                    ].map((c, i) => (
                        <Reveal key={c.title} delay={i * 90} from={i % 2 === 0 ? 'right' : 'up'}>
                            <div className="card card-hover group h-full p-6">
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_22px_-10px_rgba(1,160,254,0.9)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <Icon name={c.icon} className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <h3 className="mt-4 text-lg font-bold text-ink">{c.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.detail}</p>
                            </div>
                        </Reveal>
                    ))}

                    {/* Photo tile completing the grid */}
                    <Reveal delay={360} from="up" className="xs:col-span-2">
                        <div className="group relative overflow-hidden rounded-2xl">
                            <Img
                                base={PHOTOS.technician}
                                alt="Technician working on a vehicle inside a repair workshop"
                                ratio="aspect-[16/10] sm:aspect-[21/9]"
                                zoom
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
                                <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-5 sm:p-8">
                                    <p className="text-h3 font-bold text-white">
                                        Built for the workshop floor, not the boardroom
                                    </p>
                                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300 sm:text-sm">
                                        Basements, glare, bad signal and a customer in a hurry — the product is
                                        designed for those conditions.
                                    </p>
                                </div>
                            </Img>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    </Section>
);

// ── Solutions grid ──────────────────────────────────────────────
const SolutionsGrid = () => (
    <Section tone="muted" id="solutions">
        <SectionHeading
            eyebrow="Our solutions"
            title="Everything a claim touches, on one platform"
            lead="Seven modules that work on their own and work better together. Take the whole platform, or start with the one piece that is costing you the most time."
        />

        <div className="mt-10 grid gap-4 xs:grid-cols-2 sm:mt-12 sm:gap-5 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => {
                const photo = getSolutionImage(s.slug);
                return (
                    <Reveal key={s.slug} delay={(i % 3) * 90} from="up">
                        <Link
                            to={`/solutions/${s.slug}`}
                            className="card card-hover group flex h-full flex-col overflow-hidden"
                        >
                            {/* Photo header */}
                            <Img base={photo.base} alt={photo.alt} ratio="aspect-[16/9]" zoom>
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                                <span
                                    className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110"
                                    style={{ background: s.accent, boxShadow: `0 12px 26px -12px ${s.accent}` }}
                                >
                                    <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <span className="absolute bottom-4 right-3 hidden max-w-[55%] truncate rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur xs:block">
                                    {s.short}
                                </span>
                            </Img>

                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                                <h3 className="text-h3 font-bold text-ink transition-colors group-hover:text-brand-600">
                                    {s.name}
                                </h3>
                                <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                                    {s.tagline}
                                </p>

                                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                                    Learn more
                                    <Icon
                                        name="arrowRight"
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                                        strokeWidth={2.1}
                                    />
                                </span>
                            </div>
                        </Link>
                    </Reveal>
                );
            })}

            {/* Trailing "everything else" card */}
            <Reveal delay={180} from="up" className="xs:col-span-2 lg:col-span-1">
                <Spotlight className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-900 to-ink p-5 text-white sm:p-6 lg:p-7">
                    <div className="relative z-10">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                            <Icon name="sparkles" className="h-5 w-5 text-brand-300" strokeWidth={1.8} />
                        </span>
                        <h3 className="mt-4 text-lg font-bold">Not sure where to start?</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                            Tell us where claims currently get stuck in your process and we will point you at the one
                            module that moves the needle first.
                        </p>
                    </div>
                    <Link
                        to="/contact"
                        className="sheen group relative z-10 mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-brand-50"
                    >
                        Talk to us
                        <Icon
                            name="arrowRight"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                            strokeWidth={2.1}
                        />
                    </Link>
                </Spotlight>
            </Reveal>
        </div>
    </Section>
);

// ── Process ─────────────────────────────────────────────────────
const HowItWorks = () => (
    <Section tone="deep">
        <SectionHeading
            tone="deep"
            eyebrow="How it works"
            title="Five stages, one file, no black holes"
            lead="Every claim moves through the same tracked sequence. At any moment you can say which stage a file is at, who owns it and how long it has been there."
        />

        <div className="mt-10 grid gap-6 xs:grid-cols-2 sm:mt-14 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
                <Reveal key={p.step} delay={i * 110} from="up" className="relative">
                    {i < PROCESS.length - 1 && (
                        <span className="pointer-events-none absolute left-[3.4rem] top-6 hidden h-px w-[calc(100%-2.6rem)] bg-gradient-to-r from-brand-500/50 to-transparent lg:block" />
                    )}

                    <Spotlight className="relative rounded-2xl p-1">
                        <span className="relative z-10 grid h-12 w-12 place-items-center rounded-xl border border-brand-400/30 bg-brand-500/15 text-sm font-bold text-brand-300 backdrop-blur transition-transform duration-500 hover:scale-110">
                            {p.step}
                        </span>
                        <h3 className="relative z-10 mt-4 text-base font-bold text-white">{p.title}</h3>
                        <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-400">{p.detail}</p>
                    </Spotlight>
                </Reveal>
            ))}
        </div>
    </Section>
);

// ── Differentiators ─────────────────────────────────────────────
const WhyUs = () => (
    <Section tone="light">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="lg:col-span-5">
                <SectionHeading
                    align="left"
                    eyebrow="Why us"
                    title="Automation is easy. Automation you can defend is the hard part."
                    lead="A claim file has to hold up in front of an assessor, an auditor and sometimes an ombudsman. That constraint shaped every decision in this platform."
                />

                <Reveal delay={140} from="left">
                    <Link
                        to="/why-us"
                        className="group mt-6 inline-flex items-center gap-2 py-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
                    >
                        See the full comparison
                        <Icon
                            name="arrowRight"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                            strokeWidth={2.1}
                        />
                    </Link>
                </Reveal>

                <Reveal delay={220} from="up" className="mt-9">
                    <Parallax speed={0.05}>
                        <div className="group relative overflow-hidden rounded-2xl">
                            <Img
                                base={PHOTOS.stripped}
                                alt="Car with the front bumper removed, exposing the structure underneath"
                                ratio="aspect-[4/3]"
                                zoom
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-5">
                                    <p className="text-sm font-semibold text-white">
                                        Priced line by line, not guessed at
                                    </p>
                                </div>
                            </Img>
                        </div>
                    </Parallax>
                </Reveal>
            </div>

            <div className="space-y-4 lg:col-span-7">
                {DIFFERENTIATORS.map((d, i) => (
                    <Reveal key={d.title} delay={i * 90} from="right">
                        <div className="card card-hover group flex gap-5 p-6">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500">
                                <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.8} />
                            </span>
                            <div>
                                <h3 className="text-base font-bold text-ink">{d.title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d.detail}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </Section>
);

// ── Audiences ───────────────────────────────────────────────────
const BuiltFor = () => (
    <Section tone="muted">
        <SectionHeading
            eyebrow="Who it is for"
            title="One claim, six parties, one shared record"
            lead="Everybody involved in a claim sees the same file — filtered to what their role should see, and nothing more."
        />

        <div className="mt-10 grid gap-4 xs:grid-cols-2 sm:mt-12 lg:grid-cols-3">
            {AUDIENCES.map((a, i) => (
                <Reveal key={a.title} delay={(i % 3) * 90} from="scale">
                    <div className="card card-hover group h-full p-5 sm:p-6">
                        <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-500">
                                <Icon name={a.icon} className="h-4.5 w-4.5" strokeWidth={1.8} />
                            </span>
                            <h3 className="text-[15px] font-bold text-ink sm:text-base">{a.title}</h3>
                        </div>
                        <p className="mt-3.5 text-[13px] leading-relaxed text-slate-600 sm:text-sm">{a.detail}</p>
                    </div>
                </Reveal>
            ))}
        </div>

        {/* Wide photo band */}
        <Reveal delay={140} from="up" className="mt-8">
            <div className="group relative overflow-hidden rounded-2xl">
                <Img
                    base={PHOTOS.teamInspect}
                    alt="Assessors examining an open engine bay together on site"
                    ratio="aspect-[21/9] sm:aspect-[3/1]"
                    zoom
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/62 to-ink/20" />
                    <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-5 sm:p-8 lg:p-10">
                        <p className="text-h3 font-extrabold tracking-tight text-white">
                            The same file, wherever the claim is being worked
                        </p>
                        <p className="mt-2 hidden text-[13px] leading-relaxed text-slate-300 xs:block sm:mt-2.5 sm:text-sm">
                            Workshop, surveyor, agent and self-service capture all produce one structured record — so
                            nothing is re-keyed and nothing is lost between hands.
                        </p>
                    </div>
                </Img>
            </div>
        </Reveal>
    </Section>
);

// ── Mobile app strip ────────────────────────────────────────────
const AppStrip = () => (
    <Section tone="light">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-brand-50/60">
            <div className="grid items-center gap-10 p-6 xs:p-8 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
                <div className="lg:col-span-6">
                    <Reveal from="left">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-100 sm:px-3.5 sm:tracking-[0.14em]">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                            Android &amp; iOS
                        </span>
                        <h2 className="text-h2 mt-4 font-extrabold text-ink sm:mt-5">
                            The same survey, in your surveyor&rsquo;s pocket
                        </h2>
                        <p className="text-lead mt-4 max-w-xl text-slate-600">
                            A native app that uses the device&rsquo;s own camera, GPS and storage. Photographs are
                            written to the phone first and uploaded when there is a connection — so a workshop basement
                            with no signal does not cost you the survey.
                        </p>

                        <ul className="mt-6 grid gap-3 xs:grid-cols-2 sm:mt-7">
                            {[
                                'Captures without a connection',
                                'Orientation-locked framing',
                                'On-screen silhouette guides',
                                'Screen-for-screen parity with the web',
                            ].map((f, i) => (
                                <li
                                    key={f}
                                    className="flex items-start gap-2.5 text-sm text-slate-700"
                                    style={{ animation: `page-in 0.6s ease ${200 + i * 90}ms both` }}
                                >
                                    <Icon
                                        name="check"
                                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                                        strokeWidth={2.6}
                                    />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/solutions/surveyor-mobile-app"
                            className="sheen group mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-900"
                        >
                            About the mobile app
                            <Icon
                                name="arrowRight"
                                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                strokeWidth={2.1}
                            />
                        </Link>
                    </Reveal>
                </div>

                <Reveal delay={160} from="right" className="lg:col-span-6">
                    <div className="relative pb-2 sm:pb-6">
                        {/* Field photo behind */}
                        <div className="group overflow-hidden rounded-2xl">
                            <Img
                                base={PHOTOS.underHood}
                                alt="Surveyor inspecting an engine bay on site"
                                ratio="aspect-[4/3]"
                                zoom
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/20 to-transparent" />
                            </Img>
                        </div>

                        {/* Checklist card floating over it. Offsets stay
                            inside the page gutter at every width. */}
                        <div className="float-slow absolute bottom-3 right-3 w-[150px] rounded-2xl bg-white p-3 shadow-[0_24px_50px_-24px_rgba(4,20,46,0.6)] ring-1 ring-slate-900/5 xs:w-[172px] xs:p-4 sm:-bottom-5 sm:-right-3 sm:w-[200px]">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                Capture progress
                            </p>
                            <ul className="mt-3 space-y-2">
                                {['Front', 'Front left', 'Left', 'Odometer'].map((item, ii) => (
                                    <li
                                        key={item}
                                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] font-medium ${
                                            ii <= 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'
                                        }`}
                                    >
                                        <span
                                            className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                                                ii <= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200'
                                            }`}
                                        >
                                            {ii <= 2 && <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3.4} />}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    </Section>
);

// ── Page ────────────────────────────────────────────────────────
const HomePage = () => {
    usePageMeta(
        null,
        'IBima Assist provides guided claim survey capture, AI-assisted motor damage assessment, pre-inspection and end-to-end claim intimation management for insurers, brokers, surveyors and repair workshops.',
    );

    return (
        <>
            <Hero />
            <Stats />
            <Intro />
            <SolutionsGrid />
            <HowItWorks />
            <WhyUs />
            <BuiltFor />
            <AppStrip />
            <CTABand />
        </>
    );
};

export default HomePage;
