import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Drawer } from 'antd';
import AntdScope from '../../theme/AntdScope';
import BrandLogo from '../ui/BrandLogo';
import Icon from '../ui/Icon';
import { APP_LINKS, CONTACT, NAV_LINKS } from '../../data/site';
import { SOLUTIONS } from '../../data/solutions';

/**
 * The mobile navigation drawer, split into its own module so that
 * Navbar can lazy-load it. antd is by far the heaviest dependency
 * on the site and nothing above the fold needs it — keeping it out
 * of the entry chunk is worth the extra file.
 */
const MobileMenuDrawer = ({ open, onClose }) => (
    <AntdScope>
        <Drawer
            placement="right"
            open={open}
            onClose={onClose}
            size={320}
            styles={{ body: { padding: 0 }, header: { borderBottom: '1px solid #e6ecf4' } }}
            title={<BrandLogo />}
        >
            <nav className="flex flex-col p-4">
                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                            `rounded-lg px-3 py-3 text-[15px] font-medium transition ${
                                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}

                <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Solutions
                </p>
                <div className="mt-1.5 flex flex-col">
                    {SOLUTIONS.map((s) => (
                        <Link
                            key={s.slug}
                            to={`/solutions/${s.slug}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                        >
                            <span
                                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-white"
                                style={{ background: s.accent }}
                            >
                                <Icon name={s.icon} className="h-3.5 w-3.5" strokeWidth={1.9} />
                            </span>
                            {s.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                    <Link
                        to="/contact"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white"
                    >
                        Book a demo
                    </Link>
                    <a
                        href={APP_LINKS.portal}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
                    >
                        Login to the portal
                    </a>
                    <a
                        href={CONTACT.phoneHref}
                        className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-500"
                    >
                        <Icon name="phone" className="h-4 w-4" strokeWidth={1.7} />
                        {CONTACT.phone}
                    </a>
                </div>
            </nav>
        </Drawer>
    </AntdScope>
);

export default MobileMenuDrawer;
