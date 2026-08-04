import React from 'react';
import { Link } from 'react-router-dom';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero, { HeroPill } from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import CTABand from '../components/ui/CTABand';
import { Parallax, Spotlight } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { BRAND } from '../data/site';
import { PHOTOS } from '../data/images';
import { MILESTONES, MISSION, VALUES } from '../data/content';

const AboutPage = () => {
    usePageMeta(
        'About Us',
        `${BRAND.name} builds claims technology for Indian general insurance — guided evidence capture, AI-assisted damage assessment and end-to-end claim workflow.`,
    );

    return (
        <>
            <PageHero
                eyebrow="About us"
                title="We build the machinery behind a claim"
                lead="Not the policy, not the pricing — the part in the middle that decides whether a genuine claim is settled in days or argued over for weeks."
                photo={PHOTOS.office}
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
            >
                <div className="mt-8 flex flex-wrap gap-2.5">
                    <HeroPill>Founded {BRAND.established}</HeroPill>
                    <HeroPill>Motor &amp; non-motor</HeroPill>
                    <HeroPill>Built in India</HeroPill>
                </div>
            </PageHero>

            {/* Story */}
            <Section tone="light">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <SectionHeading align="left" eyebrow="Our story" title="It started with a folder of bad photographs" />

                        <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
                            <p>
                                Anyone who has handled motor claims knows the file: eleven photographs, three of them
                                blurred, none of the odometer, no chassis number, an estimate on a garage letterhead
                                and a cause of loss that does not quite match the damage. The assessor cannot price it.
                                The handler cannot approve it. Somebody drives back out to the workshop.
                            </p>
                            <p>
                                That round trip is where most of the cycle time in a claim actually goes — and it is
                                entirely preventable. It happens because the person capturing the evidence had no
                                structure to follow and no way of knowing what was missing until it was too late.
                            </p>
                            <p>
                                So we built the structure. A guided journey that walks whoever is standing next to the
                                vehicle through every photograph, document and declaration the file needs, and refuses
                                to move on until each one is captured properly. Then we built everything downstream of
                                it: an assessment engine that reads those photographs, a console that moves the file
                                through its stages, and an audit trail that comes out of doing the work rather than
                                being assembled afterwards.
                            </p>
                            <p>
                                Motor is where we are deepest, but none of that machinery is motor-specific — which is
                                why the same platform now runs fire, marine, engineering and other branches of general
                                insurance claims.
                            </p>
                        </div>

                        {/* Two supporting photographs */}
                        <div className="mt-9 grid gap-4 sm:grid-cols-2">
                            <Reveal delay={80} from="up">
                                <div className="group overflow-hidden rounded-2xl">
                                    <Img
                                        base={PHOTOS.crashRear}
                                        alt="Damaged rear quarter of a car on a recovery flatbed"
                                        ratio="aspect-[4/3]"
                                        zoom
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                                        <p className="absolute inset-x-0 bottom-0 p-4 text-xs font-semibold text-white">
                                            The file starts at the loss
                                        </p>
                                    </Img>
                                </div>
                            </Reveal>
                            <Reveal delay={170} from="up">
                                <div className="group overflow-hidden rounded-2xl">
                                    <Img
                                        base={PHOTOS.officeCollab}
                                        alt="Colleagues discussing work across an office desk"
                                        ratio="aspect-[4/3]"
                                        zoom
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                                        <p className="absolute inset-x-0 bottom-0 p-4 text-xs font-semibold text-white">
                                            …and closes with a decision someone can defend
                                        </p>
                                    </Img>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    {/* Numbers card */}
                    <Reveal delay={120} from="right" className="lg:col-span-5">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-brand-50/70 p-7 lg:sticky lg:top-28">
                            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                What we are
                            </h3>
                            <dl className="mt-5 space-y-5">
                                {[
                                    { k: 'A claims technology company', v: 'Not a broker, not an insurer — the software and the process behind the claim.' },
                                    { k: 'Product-led, in-house built', v: 'The web console, the native app and the assessment services are all built and maintained by our own team.' },
                                    { k: 'Domain-first', v: 'The workflow follows how claims actually move, because claims people specified it.' },
                                    { k: 'Branch-agnostic underneath', v: 'Motor first, with fire, marine, engineering and other lines on the same foundation.' },
                                ].map((row) => (
                                    <div key={row.k} className="flex gap-3">
                                        <Icon
                                            name="check"
                                            className="mt-1 h-4 w-4 shrink-0 text-brand-600"
                                            strokeWidth={2.6}
                                        />
                                        <div>
                                            <dt className="text-sm font-bold text-ink">{row.k}</dt>
                                            <dd className="mt-1 text-[13px] leading-relaxed text-slate-600">{row.v}</dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </Reveal>
                </div>
            </Section>

            {/* Mission & vision */}
            <Section tone="deep">
                <div className="grid gap-6 lg:grid-cols-2">
                    {[
                        { label: 'Our mission', body: MISSION.mission, icon: 'shield' },
                        { label: 'Our vision', body: MISSION.vision, icon: 'branches' },
                    ].map((m, i) => (
                        <Reveal key={m.label} delay={i * 130} from={i === 0 ? 'left' : 'right'}>
                            <Spotlight className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-8 backdrop-blur lg:p-10">
                                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/30">
                                    <Icon name={m.icon} className="h-5.5 w-5.5" strokeWidth={1.7} />
                                </span>
                                <h2 className="relative z-10 mt-5 text-2xl font-extrabold tracking-tight text-white">
                                    {m.label}
                                </h2>
                                <p className="relative z-10 mt-4 text-base leading-relaxed text-slate-300">{m.body}</p>
                            </Spotlight>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* Values */}
            <Section tone="light">
                <SectionHeading
                    eyebrow="What we hold to"
                    title="Four things we will not trade away"
                    lead="These are not posters on a wall — each one has cost us a shortcut at some point."
                />

                <div className="mt-12 grid gap-5 sm:grid-cols-2">
                    {VALUES.map((v, i) => (
                        <Reveal key={v.title} delay={(i % 2) * 100} from={i % 2 === 0 ? 'left' : 'right'}>
                            <div className="card card-hover group h-full p-7">
                                <span className="block text-3xl font-extrabold text-brand-100 transition-colors duration-500 group-hover:text-brand-300">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="mt-2 text-lg font-bold text-ink">{v.title}</h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{v.detail}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Wide photo band */}
                <Reveal delay={120} from="up" className="mt-10">
                    <Parallax speed={0.04}>
                        <div className="group overflow-hidden rounded-3xl">
                            <Img
                                base={PHOTOS.onLift}
                                alt="Vehicle raised on a two-post lift inside a repair workshop"
                                ratio="aspect-[21/9] sm:aspect-[3/1]"
                                zoom
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/60 to-ink/20" />
                                <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-6 sm:p-10">
                                    <p className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                                        Nothing here was designed in a boardroom
                                    </p>
                                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                                        Every screen was shaped by watching surveyors and workshop staff try to use the
                                        previous version of it, on a phone, in bad light, with someone waiting.
                                    </p>
                                </div>
                            </Img>
                        </div>
                    </Parallax>
                </Reveal>
            </Section>

            {/* Timeline */}
            <Section tone="muted">
                <SectionHeading
                    eyebrow="How we got here"
                    title="The platform, year by year"
                    lead="Each stage solved the bottleneck the previous one exposed."
                />

                <div className="mx-auto mt-14 max-w-3xl">
                    {MILESTONES.map((m, i) => (
                        <Reveal key={m.year} delay={i * 100} from="left">
                            <div className="group relative flex gap-6 pb-9 last:pb-0">
                                {i < MILESTONES.length - 1 && (
                                    <span className="absolute left-[2.15rem] top-14 h-[calc(100%-3rem)] w-px bg-slate-200" />
                                )}
                                <span className="relative z-10 grid h-[4.3rem] w-[4.3rem] shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-brand-600 shadow-[0_10px_24px_-14px_rgba(4,20,46,0.4)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-300 group-hover:shadow-[0_16px_32px_-14px_rgba(1,160,254,0.5)]">
                                    {m.year}
                                </span>
                                <div className="pt-3.5">
                                    <h3 className="text-base font-bold text-ink">{m.title}</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{m.detail}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={120} className="mt-12 text-center">
                    <Link
                        to="/team"
                        className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-900"
                    >
                        Meet the team behind it
                        <Icon
                            name="arrowRight"
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            strokeWidth={2.1}
                        />
                    </Link>
                </Reveal>
            </Section>

            <CTABand />
        </>
    );
};

export default AboutPage;
