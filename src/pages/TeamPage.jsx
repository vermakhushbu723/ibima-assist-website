import React from 'react';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero, { HeroPill } from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import CTABand from '../components/ui/CTABand';
import { Spotlight } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { PHOTOS } from '../data/images';
import { TEAM_CAPABILITIES, TEAM_PROFILES } from '../data/content';

/**
 * Individual leadership cards render as clearly-marked placeholders
 * until the client supplies real names, roles and photographs —
 * see TEAM_PROFILES in src/data/content.js. The stock portrait is a
 * visual stand-in only, which is why the badge stays prominent.
 */
const ProfileCard = ({ person, index }) => (
    <Reveal delay={index * 100} from="up">
        <div className="card card-hover group h-full overflow-hidden text-center">
            <div className="relative">
                {person.photo && PHOTOS[person.photo] ? (
                    <Img
                        base={PHOTOS[person.photo]}
                        alt=""
                        ratio="aspect-[4/5]"
                        zoom
                        imgClassName={person.placeholder ? 'grayscale-[0.35]' : ''}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                    </Img>
                ) : (
                    <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-brand-50 to-slate-100">
                        <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-slate-300 shadow-inner ring-1 ring-slate-200">
                            <Icon name="user" className="h-9 w-9" strokeWidth={1.4} />
                        </span>
                    </div>
                )}

                {person.placeholder && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-950 shadow">
                        Placeholder
                    </span>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-base font-bold text-ink">{person.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-600">{person.role}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-500">{person.bio}</p>
            </div>
        </div>
    </Reveal>
);

const TeamPage = () => {
    usePageMeta(
        'Our Team',
        'Claims professionals, licensed surveyors, computer-vision engineers and product teams — the people behind the IBima Assist platform.',
    );

    return (
        <>
            <PageHero
                eyebrow="Our team"
                title="Claims people and engineers, in the same room"
                lead="Insurance software fails when it is written by people who have never had to close a file. Ours is specified by claims professionals and built by engineers who sit next to them."
                photo={PHOTOS.officeCollab}
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Our Team' }]}
            >
                <div className="mt-8 flex flex-wrap gap-2.5">
                    <HeroPill>Licensed surveyors</HeroPill>
                    <HeroPill>Computer vision</HeroPill>
                    <HeroPill>In-house product</HeroPill>
                </div>
            </PageHero>

            {/* Capabilities — the honest, publishable part */}
            <Section tone="light">
                <SectionHeading
                    eyebrow="How the team is built"
                    title="Four disciplines, one product"
                    lead="Each of these has veto over its own area, which is why the workflow matches how claims really move and the AI does not overreach."
                />

                <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
                    {TEAM_CAPABILITIES.map((c, i) => (
                        <Reveal key={c.title} delay={(i % 2) * 100} from={i % 2 === 0 ? 'left' : 'right'}>
                            <div className="card card-hover group flex h-full gap-4 p-5 sm:gap-5 sm:p-7">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_12px_26px_-12px_rgba(1,160,254,0.9)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <Icon name={c.icon} className="h-5.5 w-5.5" strokeWidth={1.75} />
                                </span>
                                <div>
                                    <h3 className="text-h3 font-bold text-ink">{c.title}</h3>
                                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                                        {c.detail}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Field + desk, side by side */}
                <div className="mt-4 grid gap-4 xs:grid-cols-2 sm:mt-8">
                    {[
                        {
                            base: PHOTOS.technician,
                            alt: 'Technician working under a bonnet in a workshop',
                            caption: 'In the field, with the surveyors',
                        },
                        {
                            base: PHOTOS.office,
                            alt: 'Open-plan office with people at desks',
                            caption: 'And back at the desk, shipping the fix',
                        },
                    ].map((p, i) => (
                        <Reveal key={p.caption} delay={i * 110} from="up">
                            <div className="group overflow-hidden rounded-2xl">
                                <Img base={p.base} alt={p.alt} ratio="aspect-[16/10]" zoom>
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                                    <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-white">
                                        {p.caption}
                                    </p>
                                </Img>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* Leadership — placeholders */}
            <Section tone="muted">
                <SectionHeading
                    eyebrow="Leadership"
                    title="The people accountable for it"
                    lead="Profiles are being finalised — names, roles and photographs will appear here shortly."
                />

                <div className="mt-10 grid gap-4 xs:grid-cols-2 sm:mt-12 sm:gap-5 lg:grid-cols-3">
                    {TEAM_PROFILES.map((p, i) => (
                        <ProfileCard key={`${p.role}-${i}`} person={p} index={i} />
                    ))}
                </div>

                <Reveal delay={200} className="mx-auto mt-10 max-w-2xl">
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 text-center text-[13px] leading-relaxed text-slate-500">
                        <strong className="font-semibold text-slate-600">Note for the site owner:</strong> replace the
                        entries in <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">TEAM_PROFILES</code>{' '}
                        (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">src/data/content.js</code>)
                        with real names, designations, biographies and photographs. This notice disappears once{' '}
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px]">placeholder</code> is removed.
                    </p>
                </Reveal>
            </Section>

            {/* Working with us */}
            <Section tone="deep">
                <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div className="lg:col-span-5">
                        <SectionHeading
                            tone="deep"
                            align="left"
                            eyebrow="Working with us"
                            title="You get the people who built it"
                            lead="Onboarding is run by the same team that writes the product, not handed to a separate implementation vendor."
                        />
                    </div>

                    <div className="grid gap-4 xs:grid-cols-2 lg:col-span-7">
                        {[
                            { title: 'Scoping', detail: 'We look at your current claim journey and agree where the platform starts.', icon: 'clipboard' },
                            { title: 'Configuration', detail: 'Partners, roles, checklists and report formats set up against your book.', icon: 'workflow' },
                            { title: 'Training', detail: 'Sessions for surveyor, workshop and handler teams — in the field, not just on a call.', icon: 'expertise' },
                            { title: 'Ongoing support', detail: 'A support desk for live claim traffic, with the engineering team behind it.', icon: 'support' },
                        ].map((s, i) => (
                            <Reveal key={s.title} delay={i * 90} from="up">
                                <Spotlight className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur transition-transform duration-500 hover:-translate-y-1">
                                    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-lg bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/30">
                                        <Icon name={s.icon} className="h-4.5 w-4.5" strokeWidth={1.8} />
                                    </span>
                                    <h3 className="relative z-10 mt-4 text-base font-bold text-white">{s.title}</h3>
                                    <p className="relative z-10 mt-1.5 text-sm leading-relaxed text-slate-400">
                                        {s.detail}
                                    </p>
                                </Spotlight>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>

            <CTABand
                eyebrow="Get in touch"
                title="Talk to the team directly"
                lead="No call centre, no gatekeeping. Tell us what you are trying to fix and you will get someone who can actually answer."
                secondaryLabel="About the company"
                secondaryTo="/about"
            />
        </>
    );
};

export default TeamPage;
