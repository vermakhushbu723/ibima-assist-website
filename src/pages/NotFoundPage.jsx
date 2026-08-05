import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';
import usePageMeta from '../hooks/usePageMeta';
import { NAV_LINKS } from '../data/site';

const NotFoundPage = () => {
    usePageMeta('Page not found');

    return (
        <section className="surface-deep grid-overlay relative flex min-h-[80vh] items-center overflow-hidden">
            <div className="container-page relative z-10 py-20 text-center sm:py-24">
                <p className="text-[4.5rem] font-extrabold leading-none tracking-tight text-white/10 xs:text-[6rem] sm:text-[9rem]">
                    404
                </p>

                <h1 className="text-h1 -mt-4 font-extrabold text-white xs:-mt-6 sm:-mt-10">
                    That page is not here
                </h1>
                <p className="text-lead mx-auto mt-4 max-w-md text-slate-400">
                    The link may be out of date, or the page may have moved. Here is everything else.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-9 sm:gap-2.5">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-[13px] font-medium text-slate-200 backdrop-blur transition hover:border-white/35 hover:bg-white/10 hover:text-white sm:px-4 sm:text-sm"
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                <Link
                    to="/"
                    className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(1,160,254,0.85)] transition hover:bg-brand-400"
                >
                    Back to the home page
                    <Icon
                        name="arrowRight"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2.1}
                    />
                </Link>
            </div>
        </section>
    );
};

export default NotFoundPage;
