import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero, { HeroPill } from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import CTABand from '../components/ui/CTABand';
import { Parallax, Spotlight } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { SOLUTIONS, getSolution } from '../data/solutions';
import { BRANCH_IMAGES, getModeImage, getSolutionDetailImages, getSolutionImage } from '../data/images';

const SolutionDetailPage = () => {
    const { slug } = useParams();
    const solution = getSolution(slug);

    usePageMeta(solution?.name ?? 'Solutions', solution?.summary);

    // Unknown slug — send the visitor to the catalogue rather than a 404.
    if (!solution) return <Navigate to="/solutions" replace />;

    const photo = getSolutionImage(solution.slug);
    // Capabilities and Steps get their own subject so the page isn't the
    // same picture four times over — see SOLUTION_DETAIL_IMAGES. `hero`
    // is optional and overrides the backdrop on this page only.
    const {
        hero: heroPhoto,
        rail: railPhoto,
        detail: detailPhoto,
        outcome: outcomePhoto,
    } = getSolutionDetailImages(solution.slug);
    const related = SOLUTIONS.filter((s) => s.slug !== solution.slug).slice(0, 3);

    return (
        <>
            <PageHero
                eyebrow={solution.short}
                title={solution.name}
                lead={solution.tagline}
                photo={heroPhoto ?? photo}
                breadcrumb={[
                    { label: 'Home', to: '/' },
                    { label: 'Solutions', to: '/solutions' },
                    { label: solution.name },
                ]}
            >
                <div className="mt-8 flex flex-wrap gap-2.5">
                    {solution.heroPoints.map((h) => (
                        <HeroPill key={h}>{h}</HeroPill>
                    ))}
                </div>
            </PageHero>

            {/* Overview + audience rail */}
            <Section tone="light">
                <div className="grid gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div className="lg:col-span-7">
                        <SectionHeading align="left" eyebrow="Overview" title={`What ${solution.name} does`} />
                        <p className="text-lead mt-5 text-slate-600">{solution.summary}</p>

                        {solution.note && (
                            <div className="mt-7 flex gap-3 rounded-xl border-l-4 border-brand-500 bg-brand-50/70 p-4">
                                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.6} />
                                <p className="text-sm leading-relaxed text-slate-700">{solution.note}</p>
                            </div>
                        )}

                        {/* Capture modes, where the module has them */}
                        {solution.modes && (
                            <div className="mt-10">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Available as
                                </h3>
                                {/* Each channel gets the photograph of who
                                    actually operates it — workshop floor,
                                    surveyor on site, customer's phone. */}
                                <div className="mt-4 space-y-3">
                                    {solution.modes.map((m, i) => {
                                        const photo = getModeImage(m.name);
                                        return (
                                            <Reveal key={m.name} delay={i * 80} from="up">
                                                <div className="group flex gap-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 p-3 transition-all duration-400 hover:border-brand-200 hover:bg-white sm:p-4">
                                                    <div className="relative w-24 shrink-0 overflow-hidden rounded-lg sm:w-32">
                                                        <Img
                                                            {...photo}
                                                            ratio="aspect-[4/3] h-full"
                                                            width={480}
                                                            zoom
                                                        >
                                                            <span
                                                                className="absolute bottom-1.5 left-1.5 grid h-6 w-6 place-items-center rounded-md text-[11px] font-bold text-white"
                                                                style={{ background: solution.accent }}
                                                            >
                                                                {i + 1}
                                                            </span>
                                                        </Img>
                                                    </div>

                                                    <div className="min-w-0 self-center">
                                                        <p className="text-sm font-bold text-ink">{m.name}</p>
                                                        <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                                                            {m.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Branch list, for non-motor */}
                        {solution.branches && (
                            <div className="mt-10">
                                <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    Branches covered
                                </h3>
                                {/* Fire, marine, engineering, health and
                                    liability each get their own scene, so the
                                    branch is obvious before the label is read. */}
                                <div className="mt-4 grid gap-3 xs:grid-cols-2">
                                    {solution.branches.map((b, i) => {
                                        const photo = BRANCH_IMAGES[b.name];
                                        return (
                                            <Reveal key={b.name} delay={(i % 2) * 80} from="up">
                                                <div className="card card-hover group flex h-full flex-col overflow-hidden">
                                                    {photo && (
                                                        <Img
                                                            {...photo}
                                                            ratio="aspect-[16/9]"
                                                            zoom
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                                                            <p className="absolute inset-x-0 bottom-0 p-3 text-sm font-bold text-white">
                                                                {b.name}
                                                            </p>
                                                        </Img>
                                                    )}
                                                    <p className="flex-1 p-4 text-[13px] leading-relaxed text-slate-600">
                                                        {b.detail}
                                                    </p>
                                                </div>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky side rail */}
                    <div className="lg:col-span-5">
                        <Reveal delay={100} from="right" className="lg:sticky lg:top-28">
                            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_54px_-30px_rgba(4,20,46,0.45)]">
                                {/* Photo header */}
                                <div className="relative">
                                    <Img {...(railPhoto ?? photo)} ratio="aspect-[16/9]" />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(160deg, ${solution.accent}66 0%, rgba(4,20,46,0.88) 82%)`,
                                        }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 px-6 pb-5 text-white">
                                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                                            <Icon name={solution.icon} className="h-6 w-6" strokeWidth={1.7} />
                                        </span>
                                        <h3 className="mt-3 text-lg font-bold">{solution.name}</h3>
                                        <p className="mt-0.5 text-sm text-white/80">{solution.short}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6">
                                    <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        Built for
                                    </h4>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {solution.audience.map((a) => (
                                            <li
                                                key={a}
                                                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                                            >
                                                {a}
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                        What changes
                                    </h4>
                                    <ul className="mt-3 space-y-3">
                                        {solution.outcomes.map((o) => (
                                            <li key={o} className="flex items-start gap-2.5">
                                                <Icon
                                                    name="check"
                                                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                                                    strokeWidth={2.6}
                                                />
                                                <span className="text-[13px] leading-relaxed text-slate-600">{o}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/contact"
                                        className="sheen group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                                    >
                                        Request a demo
                                        <Icon
                                            name="arrowRight"
                                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                            strokeWidth={2.1}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* Features */}
            <Section tone="muted">
                <SectionHeading
                    eyebrow="Capabilities"
                    title="What is included"
                    lead={`Everything ${solution.name} does, in plain terms.`}
                />

                {/* A close-up of what this module actually does, so the
                    capability list is introduced by its own subject. */}
                <Reveal delay={100} from="up" className="mt-10">
                    <div className="group overflow-hidden rounded-2xl sm:rounded-3xl">
                        <Img
                            {...detailPhoto}
                            ratio="aspect-[16/10] xs:aspect-[21/9] sm:aspect-[16/5]"
                            zoom
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(100deg, rgba(4,20,46,0.94) 0%, ${solution.accent}55 65%, rgba(4,20,46,0.25) 100%)`,
                                }}
                            />
                            <div className="absolute inset-0 flex max-w-xl flex-col justify-center p-5 sm:p-8 lg:p-10">
                                <p className="text-h3 font-extrabold tracking-tight text-white">{detailPhoto.alt}</p>
                                <p className="mt-2 hidden text-[13px] leading-relaxed text-slate-200 xs:block sm:text-sm">
                                    {solution.heroPoints.join(' · ')}
                                </p>
                            </div>
                        </Img>
                    </div>
                </Reveal>

                <div className="mt-10 grid gap-4 xs:grid-cols-2 sm:mt-12 lg:grid-cols-3">
                    {solution.features.map((f, i) => (
                        <Reveal key={f.title} delay={(i % 3) * 90} from="up">
                            <div className="card card-hover group h-full p-6">
                                <span
                                    className="grid h-10 w-10 place-items-center rounded-lg text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                                    style={{ background: solution.accent }}
                                >
                                    <Icon name="check" className="h-4.5 w-4.5" strokeWidth={2.4} />
                                </span>
                                <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.detail}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* Steps */}
            <Section tone="deep">
                <SectionHeading
                    tone="deep"
                    eyebrow="Step by step"
                    title="How it runs"
                    lead="The sequence a real job follows, start to finish."
                />

                <div className="mt-10 grid gap-10 sm:mt-14 md:gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div className="lg:col-span-7">
                        {solution.steps.map((s, i) => (
                            <Reveal key={s.title} delay={i * 100} from="left">
                                <div className="group relative flex gap-5 pb-8 last:pb-0">
                                    {/* Vertical rail */}
                                    {i < solution.steps.length - 1 && (
                                        <span className="absolute left-[1.4rem] top-12 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-brand-500/45 to-transparent" />
                                    )}
                                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-400/30 bg-brand-500/15 text-sm font-bold text-brand-300 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:border-brand-400/70 group-hover:bg-brand-500/30">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="pt-1.5">
                                        <h3 className="text-base font-bold text-white">{s.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.detail}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={140} from="right" className="lg:col-span-5">
                        <Parallax speed={0.05}>
                            {/* What you are left with once the steps are done. */}
                            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 lg:sticky lg:top-28">
                                <Img {...outcomePhoto} ratio="aspect-[4/5]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-6">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">
                                            What you end up with
                                        </p>
                                        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                                            {outcomePhoto.alt}
                                        </p>
                                    </div>
                                </Img>
                            </div>
                        </Parallax>
                    </Reveal>
                </div>
            </Section>

            {/* Related */}
            <Section tone="light">
                <SectionHeading
                    eyebrow="Pairs well with"
                    title="Other modules on the platform"
                    lead="These share the same data, so nothing has to be re-entered between them."
                />

                <div className="mt-10 grid gap-4 xs:grid-cols-2 sm:mt-12 sm:gap-5 lg:grid-cols-3">
                    {related.map((r, i) => {
                        const rp = getSolutionImage(r.slug);
                        return (
                            <Reveal key={r.slug} delay={i * 90} from="up">
                                <Link
                                    to={`/solutions/${r.slug}`}
                                    className="card card-hover group flex h-full flex-col overflow-hidden"
                                >
                                    <Img {...rp} ratio="aspect-[16/9]" zoom>
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                                        <span
                                            className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-xl text-white transition-transform duration-500 group-hover:scale-110"
                                            style={{ background: r.accent }}
                                        >
                                            <Icon name={r.icon} className="h-4.5 w-4.5" strokeWidth={1.75} />
                                        </span>
                                    </Img>

                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="text-base font-bold text-ink transition-colors group-hover:text-brand-600">
                                            {r.name}
                                        </h3>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                                            {r.tagline}
                                        </p>
                                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
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
                </div>
            </Section>

            <CTABand
                title={`See ${solution.name} on your own claims`}
                secondaryLabel="Back to all solutions"
                secondaryTo="/solutions"
            />
        </>
    );
};

export default SolutionDetailPage;
