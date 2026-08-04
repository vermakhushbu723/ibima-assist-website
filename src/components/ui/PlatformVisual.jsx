import React from 'react';
import Icon from './Icon';
import Img from './Img';
import { PHOTOS } from '../../data/images';

// =============================================================
// PLATFORM VISUAL
// The hero composition: the claims console, the guided capture
// screen on a phone, and an AI assessment card. The console and
// the phone chrome are drawn (so they stay sharp and need no
// assets); the camera preview and the assessment thumbnail are
// real photographs.
//
// TODO: swap for real product screenshots once they are cleared
// for marketing use.
// =============================================================

const ConsoleCard = () => (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_30px_70px_-30px_rgba(4,20,46,0.65)] ring-1 ring-slate-900/5">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-[11px] font-medium text-slate-400">Claims console — intimation</span>
        </div>

        <div className="p-4">
            {/* Metric row */}
            <div className="grid grid-cols-3 gap-2.5">
                {[
                    { label: 'Open claims', value: '1,284', tint: 'from-brand-500 to-brand-700' },
                    { label: 'Surveyed', value: '946', tint: 'from-emerald-500 to-emerald-700' },
                    { label: 'Pending ILA', value: '112', tint: 'from-amber-500 to-orange-600' },
                ].map((m) => (
                    <div key={m.label} className={`rounded-xl bg-gradient-to-br ${m.tint} px-3 py-2.5 text-white`}>
                        <p className="text-[9px] font-medium uppercase tracking-wider opacity-80">{m.label}</p>
                        <p className="mt-0.5 text-lg font-bold leading-none">{m.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="mt-3 rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-slate-600">Turnaround by stage</p>
                    <p className="text-[9px] text-slate-400">last 30 days</p>
                </div>
                <div className="mt-3 flex h-16 items-end gap-1.5">
                    {[38, 62, 45, 78, 55, 88, 70, 96, 64, 82, 58, 74].map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 origin-bottom rounded-t-[3px] bg-gradient-to-t from-brand-200 to-brand-500"
                            style={{
                                height: `${h}%`,
                                animation: `page-in 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Claim rows */}
            <div className="mt-3 space-y-1.5">
                {[
                    { id: 'CLM-24817', status: 'Assessed', tone: 'bg-emerald-50 text-emerald-700' },
                    { id: 'CLM-24816', status: 'In survey', tone: 'bg-brand-50 text-brand-700' },
                    { id: 'CLM-24815', status: 'Allocated', tone: 'bg-amber-50 text-amber-700' },
                ].map((r) => (
                    <div
                        key={r.id}
                        className="flex items-center justify-between rounded-lg border border-slate-100 px-2.5 py-1.5"
                    >
                        <div className="flex items-center gap-2">
                            <span className="grid h-5 w-5 place-items-center rounded-md bg-slate-100 text-slate-500">
                                <Icon name="file" className="h-3 w-3" strokeWidth={2} />
                            </span>
                            <span className="text-[10px] font-semibold text-slate-700">{r.id}</span>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${r.tone}`}>
                            {r.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const PhoneCard = () => (
    <div className="w-[186px] rounded-[2rem] bg-slate-900 p-2 shadow-[0_36px_80px_-24px_rgba(4,20,46,0.85)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-brand-100 via-brand-500 to-brand-600">
            {/* Notch */}
            <div className="absolute left-1/2 top-1.5 z-20 h-3.5 w-16 -translate-x-1/2 rounded-full bg-slate-900" />

            <div className="px-3 pb-2 pt-6 text-center">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/80">Guided capture</p>
                <p className="mt-0.5 text-[11px] font-bold text-white">Front Left · 3 of 10</p>
            </div>

            {/* Live camera preview — a real photograph under the framing guide */}
            <div className="relative mx-2.5 overflow-hidden rounded-xl">
                <Img
                    base={PHOTOS.crashFront}
                    alt="Damaged front end of a car framed in the capture viewfinder"
                    ratio="aspect-[3/4]"
                    width={480}
                    priority
                    imgClassName="brightness-[0.86]"
                >
                    {/* Framing guide */}
                    <svg viewBox="0 0 120 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
                        <g stroke="#7dd3fc" strokeWidth="2" fill="none" strokeLinecap="round">
                            <path d="M12 26v-8h8M108 26v-8h-8M12 134v8h8M108 134v8h-8" />
                        </g>
                        <g
                            stroke="rgba(255,255,255,0.6)"
                            strokeWidth="1.5"
                            fill="rgba(125,211,252,0.1)"
                            strokeLinejoin="round"
                        >
                            <path d="M24 96v10h9v-6h54v6h9V96l-4-15-11-3-9-13H48l-9 13-11 3-4 15Z" />
                            <path d="M39 81h42" />
                        </g>
                        <g fill="rgba(255,255,255,0.45)">
                            <circle cx="38" cy="97" r="4" />
                            <circle cx="82" cy="97" r="4" />
                        </g>
                        <g>
                            <rect x="10" y="146" width="100" height="9" rx="4.5" fill="rgba(0,0,0,0.55)" />
                            <text x="15" y="152.7" fill="#a5f3fc" fontSize="5.4" fontFamily="monospace">
                                28.6139N 77.2090E · 14:32
                            </text>
                        </g>
                    </svg>

                    {/* Scanning sweep */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
                        <div className="scan-line h-8 w-full bg-gradient-to-b from-transparent via-brand-300/45 to-transparent" />
                    </div>
                </Img>
            </div>

            {/* Progress */}
            <div className="px-3 pt-2.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                    <div className="h-full w-[30%] rounded-full bg-white" />
                </div>
            </div>

            {/* Shutter */}
            <div className="flex items-center justify-center gap-4 px-3 py-3">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-white/20 text-white">
                    <Icon name="file" className="h-3 w-3" strokeWidth={2} />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-600 ring-4 ring-white/35">
                    <Icon name="camera" className="h-4.5 w-4.5" strokeWidth={1.9} />
                </span>
                <span className="grid h-6 w-6 place-items-center rounded-md bg-white/20 text-white">
                    <Icon name="gps" className="h-3 w-3" strokeWidth={2} />
                </span>
            </div>
        </div>
    </div>
);

/** Assessment result card — a real damage photo with the detected part boxed. */
const AiCard = () => (
    <div className="w-[210px] overflow-hidden rounded-xl bg-white/95 p-2 shadow-[0_22px_50px_-20px_rgba(4,20,46,0.7)] ring-1 ring-slate-900/5 backdrop-blur">
        <div className="relative overflow-hidden rounded-lg">
            <Img
                base={PHOTOS.crashRear}
                alt="Damaged rear quarter panel with the affected area detected"
                ratio="aspect-[16/10]"
                width={480}
            >
                <svg viewBox="0 0 160 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                    <rect
                        x="42"
                        y="22"
                        width="72"
                        height="46"
                        rx="3"
                        fill="rgba(1,160,254,0.12)"
                        stroke="#38b6fb"
                        strokeWidth="1.6"
                        className="dash-draw"
                    />
                    <rect x="42" y="14" width="52" height="8" rx="2" fill="#01a0fe" />
                    <text x="45" y="20.4" fill="#fff" fontSize="5.2" fontWeight="700">
                        rear quarter · 0.94
                    </text>
                </svg>
            </Img>
        </div>

        <div className="flex items-center gap-2.5 px-1 pb-0.5 pt-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Icon name="ai" className="h-3.5 w-3.5" strokeWidth={1.9} />
            </span>
            <div className="leading-tight">
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">AI assessment</p>
                <p className="text-[11px] font-bold text-ink">Replace · panel beat</p>
            </div>
        </div>
    </div>
);

const PlatformVisual = ({ className = '' }) => (
    <div className={`relative mx-auto w-full max-w-[520px] ${className}`}>
        {/* Glow behind the composition */}
        <div
            className="halo pointer-events-none absolute -inset-10 -z-10 rounded-full blur-3xl"
            style={{
                background:
                    'radial-gradient(50% 50% at 50% 50%, rgba(1,160,254,0.45) 0%, rgba(1,160,254,0) 72%)',
            }}
        />

        <div className="pl-0 sm:pl-16">
            <ConsoleCard />
        </div>

        <div className="float-slow absolute -bottom-10 -left-2 sm:-left-6">
            <PhoneCard />
        </div>

        <div
            className="float-slow absolute -right-4 top-[46%] hidden sm:block"
            style={{ animationDelay: '1.6s' }}
        >
            <AiCard />
        </div>
    </div>
);

export default PlatformVisual;
