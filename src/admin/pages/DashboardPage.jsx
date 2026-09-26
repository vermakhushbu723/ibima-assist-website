import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Empty, Skeleton, Table, Tooltip } from 'antd';
import { ArrowRightOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { api } from '../../lib/api';
import { interestLabel } from '../../data/enquiry';
import { ENQUIRIES_CHANGED, STATUS_META, fmtDateTime } from '../constants';
import StatusTag from '../components/StatusTag';

const StatTile = ({ label, value, hint, to }) => (
    <Link to={to} className="block rounded-lg border border-slate-200 bg-white p-3.5 transition hover:border-brand-300 hover:shadow-sm">
        <div className="text-[11.5px] font-medium uppercase tracking-wide text-slate-500">{label}</div>
        <div className="mt-1 text-[22px] font-bold leading-tight text-slate-800 tabular-nums">{value}</div>
        <div className="mt-0.5 text-[11.5px] text-slate-500">{hint}</div>
    </Link>
);

// Single-series daily bar chart: one hue, rounded data-ends on the
// baseline, 2px gaps, per-bar hover tooltip.
const TrendChart = ({ data }) => {
    const max = Math.max(1, ...data.map((d) => d.count));
    const total = data.reduce((a, d) => a + d.count, 0);
    return (
        <div>
            <div className="relative flex h-36 items-end gap-[2px] border-b border-slate-200">
                {[0.5, 1].map((f) => (
                    <div
                        key={f}
                        className="pointer-events-none absolute inset-x-0 border-t border-dashed border-slate-100"
                        style={{ bottom: `${f * 100}%` }}
                    />
                ))}
                {data.map((d) => (
                    <Tooltip key={d.date} title={`${dayjs(d.date).format('ddd, DD MMM')}: ${d.count} enquir${d.count === 1 ? 'y' : 'ies'}`}>
                        <div className="group relative flex h-full flex-1 cursor-default items-end">
                            <div
                                className="w-full rounded-t-[4px] bg-brand-500 transition group-hover:bg-brand-600"
                                style={{ height: d.count ? `${(d.count / max) * 100}%` : 0, minHeight: d.count ? 3 : 0 }}
                            />
                        </div>
                    </Tooltip>
                ))}
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-slate-500">
                <span>{dayjs(data[0]?.date).format('DD MMM')}</span>
                <span>
                    {total} in {data.length} days · peak {max === 1 && !total ? 0 : max}/day
                </span>
                <span>{dayjs(data[data.length - 1]?.date).format('DD MMM')}</span>
            </div>
        </div>
    );
};

const BreakdownList = ({ rows, total }) =>
    rows.length ? (
        <ul className="space-y-2.5">
            {rows.map((r) => {
                const pct = total ? Math.round((r.count / total) * 100) : 0;
                return (
                    <li key={r.label}>
                        <div className="flex justify-between gap-3 text-[12.5px]">
                            <span className="truncate text-slate-700">{r.label}</span>
                            <span className="shrink-0 tabular-nums text-slate-500">
                                {r.count} · {pct}%
                            </span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
                        </div>
                    </li>
                );
            })}
        </ul>
    ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data yet" />
    );

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const load = useCallback(() => {
        setLoading(true);
        setError('');
        api('/admin/stats', { auth: true })
            .then(setStats)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        load();
        window.addEventListener(ENQUIRIES_CHANGED, load);
        return () => window.removeEventListener(ENQUIRIES_CHANGED, load);
    }, [load]);

    if (error) {
        return <Alert type="error" showIcon title="Could not load the dashboard" description={error} action={<Button onClick={load}>Retry</Button>} />;
    }
    if (!stats) return <Skeleton active paragraph={{ rows: 8 }} />;

    const s = stats.status;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (v, r) => (
                <div className="min-w-0">
                    <div className="font-medium text-slate-800">{v}</div>
                    <div className="text-[11.5px] text-slate-500">{r.organisation}</div>
                </div>
            ),
        },
        { title: 'Interested in', dataIndex: 'interest', responsive: ['md'], render: (v) => interestLabel(v) || '—' },
        { title: 'Received', dataIndex: 'createdAt', responsive: ['sm'], render: fmtDateTime },
        { title: 'Status', dataIndex: 'status', width: 100, render: (v) => <StatusTag status={v} /> },
    ];

    return (
        <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12.5px] text-slate-500">Everything submitted through the forms on the public website.</p>
                <Button icon={<ReloadOutlined />} onClick={load} loading={loading}>
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatTile label="Total enquiries" value={stats.total} hint="All time, Contact form" to="/admin/enquiries" />
                <StatTile label={STATUS_META.new.label} value={s.new} hint="Waiting for a first reply" to="/admin/enquiries?status=new" />
                <StatTile label="Last 7 days" value={stats.last7Days} hint="Received this week" to="/admin/enquiries" />
                <StatTile
                    label={STATUS_META.qualified.label}
                    value={s.qualified}
                    hint={`${s.contacted} contacted · ${s.closed} closed`}
                    to="/admin/enquiries?status=qualified"
                />
            </div>

            <div className="grid gap-3 sm:gap-4 xl:grid-cols-3">
                <Card title="Enquiries per day" className="xl:col-span-2" extra={<span className="text-[11.5px] text-slate-500">Last 14 days</span>}>
                    <TrendChart data={stats.trend} />
                </Card>
                <Card title="By status">
                    <ul className="divide-y divide-slate-100">
                        {Object.entries(STATUS_META).map(([key]) => (
                            <li key={key}>
                                <Link to={`/admin/enquiries?status=${key}`} className="flex items-center justify-between py-2 text-[12.5px] hover:bg-slate-50">
                                    <StatusTag status={key} />
                                    <span className="font-semibold tabular-nums text-slate-700">{s[key]}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
                <Card title="Who is enquiring" extra={<span className="text-[11.5px] text-slate-500">“You are a”</span>}>
                    <BreakdownList rows={stats.byOrgType} total={stats.total} />
                </Card>
                <Card title="What they want" extra={<span className="text-[11.5px] text-slate-500">“Interested in”</span>}>
                    <BreakdownList rows={stats.byInterest} total={stats.total} />
                </Card>
            </div>

            <Card
                title="Latest enquiries"
                extra={
                    <Link to="/admin/enquiries" className="text-[12.5px]">
                        View all <ArrowRightOutlined />
                    </Link>
                }
                styles={{ body: { padding: 0 } }}
            >
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={stats.recent}
                    pagination={false}
                    locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No enquiries yet" /> }}
                    onRow={(r) => ({ onClick: () => navigate(`/admin/enquiries?view=${r._id}`), className: 'cursor-pointer' })}
                />
            </Card>
        </div>
    );
};

export default DashboardPage;
