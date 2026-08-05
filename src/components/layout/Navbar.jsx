import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import Icon from '../ui/Icon';
import { NAV_LINKS, APP_LINKS } from '../../data/site';
import { SOLUTIONS } from '../../data/solutions';

// antd is the heaviest dependency on the site and only the mobile
// drawer needs it in the shell, so it's fetched on first open.
const MobileMenuDrawer = lazy(() => import('./MobileMenuDrawer'));

/**
 * Sticky top navigation. Transparent over the dark hero, and it
 * switches to a solid white bar once the page is scrolled — which
 * is why it needs the scroll listener rather than plain CSS.
 */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    // Stays true once the drawer has been opened, so the lazy chunk
    // isn't unmounted and re-fetched on every close.
    const [drawerMounted, setDrawerMounted] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close both menus on navigation.
    useEffect(() => {
        setDrawerOpen(false);
        setSolutionsOpen(false);
    }, [location.pathname]);

    const solid = scrolled || drawerOpen;

    const linkClass = ({ isActive }) =>
        [
            'nav-underline relative px-3 py-2 text-sm font-medium transition-colors rounded-lg',
            isActive ? 'is-active' : '',
            solid
                ? isActive
                    ? 'text-brand-600'
                    : 'text-slate-600 hover:text-brand-600'
                : isActive
                  ? 'text-white'
                  : 'text-slate-300 hover:text-white',
        ].join(' ');

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                    solid
                        ? 'border-b border-slate-200/80 bg-white/92 backdrop-blur-md shadow-[0_2px_20px_-8px_rgba(4,20,46,0.25)]'
                        : 'border-b border-transparent bg-transparent'
                }`}
            >
                <div className="container-page flex h-14 items-center justify-between gap-3 xs:h-16 lg:h-[4.5rem]">
                    <BrandLogo variant={solid ? 'dark' : 'light'} />

                    {/* Desktop nav — the seven links plus two actions need
                        roughly 1024px before they stop crowding, so the
                        drawer covers everything below that. */}
                    <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
                        {NAV_LINKS.map((link) =>
                            link.to === '/solutions' ? (
                                <div
                                    key={link.to}
                                    className="relative"
                                    onMouseEnter={() => setSolutionsOpen(true)}
                                    onMouseLeave={() => setSolutionsOpen(false)}
                                >
                                    <NavLink to={link.to} className={linkClass}>
                                        <span className="inline-flex items-center gap-1.5">
                                            {link.label}
                                            <Icon
                                                name="chevronDown"
                                                className={`h-3 w-3 transition-transform duration-300 ${
                                                    solutionsOpen ? 'rotate-180' : ''
                                                }`}
                                                strokeWidth={2.4}
                                            />
                                        </span>
                                    </NavLink>

                                    {solutionsOpen && (
                                        <div className="absolute left-1/2 top-full w-[min(40rem,calc(100vw-3rem))] -translate-x-1/2 pt-3">
                                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_60px_-24px_rgba(4,20,46,0.45)] page-in">
                                                <div className="grid grid-cols-1 gap-1 p-2.5 sm:grid-cols-2">
                                                    {SOLUTIONS.map((s, i) => (
                                                        <Link
                                                            key={s.slug}
                                                            to={`/solutions/${s.slug}`}
                                                            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 hover:bg-slate-50"
                                                            style={{
                                                                animation: `page-in 0.35s ease ${i * 35}ms both`,
                                                            }}
                                                        >
                                                            <span
                                                                className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white transition-transform duration-300 group-hover:scale-110"
                                                                style={{ background: s.accent }}
                                                            >
                                                                <Icon name={s.icon} className="h-4 w-4" strokeWidth={1.8} />
                                                            </span>
                                                            <span className="min-w-0">
                                                                <span className="block text-[13px] font-semibold text-ink transition-colors group-hover:text-brand-600">
                                                                    {s.name}
                                                                </span>
                                                                <span className="block truncate text-[11.5px] text-slate-500">
                                                                    {s.short}
                                                                </span>
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>

                                                <Link
                                                    to="/solutions"
                                                    className="group flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3 transition hover:bg-brand-50"
                                                >
                                                    <span className="text-[13px] font-semibold text-ink">
                                                        See how they fit together
                                                    </span>
                                                    <Icon
                                                        name="arrowRight"
                                                        className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1.5"
                                                        strokeWidth={2.1}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                                    {link.label}
                                </NavLink>
                            ),
                        )}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <a
                            href={APP_LINKS.portal}
                            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                                solid
                                    ? 'text-slate-600 hover:bg-slate-100 hover:text-brand-600'
                                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            Login
                        </a>
                        <Link
                            to="/contact"
                            className="sheen group inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(1,160,254,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
                        >
                            Book a demo
                            <Icon
                                name="arrowRight"
                                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                                strokeWidth={2.2}
                            />
                        </Link>
                    </div>

                    {/* Mobile trigger */}
                    <button
                        type="button"
                        onClick={() => {
                            setDrawerMounted(true);
                            setDrawerOpen(true);
                        }}
                        aria-label="Open menu"
                        className={`-mr-1.5 grid h-11 w-11 shrink-0 place-items-center rounded-lg transition lg:hidden ${
                            solid ? 'text-ink hover:bg-slate-100' : 'text-white hover:bg-white/10'
                        }`}
                    >
                        <Icon name="menu" className="h-5.5 w-5.5" strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Mobile drawer — only mounted once the menu has been opened */}
            {drawerMounted && (
                <Suspense fallback={null}>
                    <MobileMenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
                </Suspense>
            )}
        </>
    );
};

export default Navbar;
