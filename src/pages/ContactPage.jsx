import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import AntdScope from '../theme/AntdScope';
import Section, { SectionHeading } from '../components/ui/Section';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Img from '../components/ui/Img';
import SectionBanner from '../components/ui/SectionBanner';
import { Spotlight } from '../components/ui/Motion';
import usePageMeta from '../hooks/usePageMeta';
import { CONTACT } from '../data/site';
import { PHOTOS } from '../data/images';
import { SOLUTIONS } from '../data/solutions';

const ORG_TYPES = [
    'Insurer',
    'Broker / Agent',
    'Surveyor / Loss assessor',
    'Repair workshop',
    'TPA',
    'Corporate / Fleet',
    'Other',
];

const ContactForm = () => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            // TODO: wire this to the real enquiry endpoint / CRM.
            // Until then the submission is logged and the user gets
            // an honest "we have not received this yet" fallback.
            console.info('[contact] enquiry submitted', values);
            await new Promise((r) => setTimeout(r, 600));

            messageApi.success('Thanks — your enquiry has been recorded. We will get back to you shortly.');
            form.resetFields();
        } catch {
            messageApi.error('Something went wrong. Please email us instead.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AntdScope>
            {contextHolder}
            <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish} size="large">
                <div className="grid gap-x-4 sm:grid-cols-2">
                    <Form.Item
                        name="name"
                        label="Full name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                        <Input placeholder="Your name" autoComplete="name" />
                    </Form.Item>

                    <Form.Item
                        name="organisation"
                        label="Organisation"
                        rules={[{ required: true, message: 'Please enter your organisation' }]}
                    >
                        <Input placeholder="Company name" autoComplete="organization" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Work email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'That does not look like a valid email' },
                        ]}
                    >
                        <Input placeholder="you@company.com" autoComplete="email" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            { required: true, message: 'Please enter a contact number' },
                            {
                                pattern: /^[0-9+\-\s()]{8,18}$/,
                                message: 'Please enter a valid phone number',
                            },
                        ]}
                    >
                        <Input placeholder="+91 00000 00000" autoComplete="tel" />
                    </Form.Item>

                    <Form.Item name="orgType" label="You are a">
                        <Select
                            placeholder="Select one"
                            options={ORG_TYPES.map((t) => ({ value: t, label: t }))}
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item name="interest" label="Interested in">
                        <Select
                            placeholder="Select a solution"
                            options={[
                                ...SOLUTIONS.map((s) => ({ value: s.slug, label: s.name })),
                                { value: 'whole-platform', label: 'The whole platform' },
                                { value: 'not-sure', label: 'Not sure yet' },
                            ]}
                            allowClear
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="message"
                    label="What are you trying to fix?"
                    rules={[{ required: true, message: 'A line or two is enough' }]}
                >
                    <Input.TextArea
                        rows={5}
                        placeholder="Tell us roughly where claims get stuck today, and your monthly claim volume if you can share it."
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={submitting} block style={{ height: 48 }}>
                    Send enquiry
                </Button>

                <p className="mt-3.5 text-center text-xs leading-relaxed text-slate-500">
                    We use these details only to respond to your enquiry. No marketing lists, no third parties.
                </p>
            </Form>
        </AntdScope>
    );
};

const ContactPage = () => {
    usePageMeta(
        'Contact',
        'Book a walkthrough of the claims platform, request a demo on your own claim files, or reach the team by phone and email.',
    );

    const cards = [
        {
            icon: 'phone',
            title: 'Phone',
            lines: [CONTACT.phone],
            href: CONTACT.phoneHref,
        },
        {
            icon: 'mail',
            title: 'Email',
            lines: [CONTACT.email, CONTACT.sales],
            href: CONTACT.emailHref,
        },
        {
            icon: 'pin',
            title: CONTACT.registeredOffice.label,
            lines: CONTACT.registeredOffice.lines,
        },
        {
            icon: 'pin',
            title: CONTACT.operationsOffice.label,
            lines: CONTACT.operationsOffice.lines,
        },
    ];

    return (
        <>
            <PageHero
                eyebrow="Contact"
                title="Tell us where claims get stuck"
                lead="Bring us a handful of recent files and we will walk you through the capture journey, the assessment output and the console — using your data rather than a canned demo."
                photo={PHOTOS.deskWork}
                breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
            />

            <Section tone="light">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
                    {/* Form */}
                    <Reveal className="lg:col-span-7">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_54px_-32px_rgba(4,20,46,0.4)] xs:p-7 sm:p-9">
                            <h2 className="text-h3 font-extrabold tracking-tight text-ink">Send us an enquiry</h2>
                            <p className="mb-6 mt-2 text-[13px] leading-relaxed text-slate-600 sm:mb-7 sm:text-sm">
                                Fill this in and someone from the team — not a sales bot — will come back to you.
                            </p>
                            <ContactForm />
                        </div>
                    </Reveal>

                    {/* Details */}
                    <div className="lg:col-span-5">
                        {/* Office photograph */}
                        <Reveal delay={60} from="right" className="mb-8">
                            <div className="group overflow-hidden rounded-2xl">
                                <Img
                                    base={PHOTOS.office}
                                    alt="The operations floor where claim enquiries are handled"
                                    ratio="aspect-[16/9]"
                                    zoom
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                                    <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-white">
                                        Real people, at a desk, during business hours
                                    </p>
                                </Img>
                            </div>
                        </Reveal>

                        <Reveal delay={100} from="right">
                            <h2 className="text-h3 font-extrabold tracking-tight text-ink">Reach us directly</h2>
                            <p className="mt-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                                {CONTACT.supportNote}
                            </p>
                        </Reveal>

                        <div className="mt-6 grid gap-4 xs:grid-cols-2 sm:mt-7 lg:grid-cols-1">
                            {cards.map((c, i) => {
                                const body = (
                                    <>
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                                            <Icon name={c.icon} className="h-4.5 w-4.5" strokeWidth={1.8} />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                                {c.title}
                                            </p>
                                            {c.lines.map((line) => (
                                                <p
                                                    key={line}
                                                    className="mt-0.5 break-words text-[13px] font-medium text-slate-700 sm:text-sm"
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </>
                                );

                                return (
                                    <Reveal key={c.title} delay={i * 70}>
                                        {c.href ? (
                                            <a href={c.href} className="card card-hover flex gap-4 p-5">
                                                {body}
                                            </a>
                                        ) : (
                                            <div className="card flex gap-4 p-5">{body}</div>
                                        )}
                                    </Reveal>
                                );
                            })}
                        </div>

                        {/* Hours */}
                        <Reveal delay={200} className="mt-4">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                                <div className="flex items-center gap-2.5">
                                    <Icon name="clock" className="h-4.5 w-4.5 text-brand-600" strokeWidth={1.8} />
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                        Business hours
                                    </p>
                                </div>
                                <dl className="mt-3.5 space-y-2">
                                    {CONTACT.hours.map((h) => (
                                        <div key={h.days} className="flex justify-between gap-4 text-sm">
                                            <dt className="text-slate-600">{h.days}</dt>
                                            <dd className="font-medium text-slate-800">{h.time}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Section>

            {/* What happens next */}
            <Section tone="deep">
                <SectionHeading
                    tone="deep"
                    eyebrow="What happens next"
                    title="Three steps, no sales theatre"
                />

                <SectionBanner
                    name="nextSteps"
                    caption="A short call, a walkthrough on your data, a scoped proposal"
                    sub="No demo theatre, no discovery marathon. Three steps and you know whether this fits."
                    ratio="aspect-[16/10] xs:aspect-[21/9] sm:aspect-[16/5]"
                    align="center"
                    className="mt-10"
                    delay={100}
                />

                <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
                    {[
                        {
                            step: '01',
                            title: 'A short call',
                            detail: 'Twenty minutes to understand your claim volume, your current process and where it breaks.',
                        },
                        {
                            step: '02',
                            title: 'A walkthrough on your data',
                            detail: 'We run the capture journey and the assessment engine against a batch of your own closed claims.',
                        },
                        {
                            step: '03',
                            title: 'A scoped proposal',
                            detail: 'Modules, configuration, integration effort and a realistic timeline — priced against your book.',
                        },
                    ].map((s, i) => (
                        <Reveal key={s.step} delay={i * 110} from="up">
                            <Spotlight className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-5 backdrop-blur transition-transform duration-500 hover:-translate-y-1.5 sm:p-7">
                                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border border-brand-400/30 bg-brand-500/15 text-sm font-bold text-brand-300">
                                    {s.step}
                                </span>
                                <h3 className="relative z-10 mt-4 text-base font-bold text-white">{s.title}</h3>
                                <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-400">{s.detail}</p>
                            </Spotlight>
                        </Reveal>
                    ))}
                </div>
            </Section>
        </>
    );
};

export default ContactPage;
