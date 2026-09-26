import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { App, Button, Card, DatePicker, Input, Popconfirm, Select, Table, Tooltip } from 'antd';
import { ClearOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { api, buildQuery } from '../../lib/api';
import { INTEREST_OPTIONS, ORG_TYPES, interestLabel } from '../../data/enquiry';
import { ENQUIRIES_CHANGED, STATUS_OPTIONS, fmtDateTime, notifyEnquiriesChanged } from '../constants';
import EnquiryDrawer from '../components/EnquiryDrawer';

const FILTER_KEYS = ['search', 'status', 'orgType', 'interest', 'from', 'to'];

const EnquiriesPage = () => {
    const { message } = App.useApp();
    const [params, setParams] = useSearchParams();
    const [data, setData] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [exporting, setExporting] = useState(false);
    const [searchText, setSearchText] = useState(params.get('search') || '');

    // Filters, sort and paging all live in the URL so views are linkable
    // (the dashboard links straight to ?status=new, ?view=<id>, ...).
    const query = useMemo(
        () => ({
            ...Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || ''])),
            page: Number(params.get('page')) || 1,
            limit: Number(params.get('limit')) || 10,
            sort: params.get('sort') || 'createdAt',
            order: params.get('order') || 'desc',
        }),
        [params],
    );
    const viewId = params.get('view');

    const update = useCallback(
        (changes, { resetPage = true } = {}) => {
            setParams(
                (prev) => {
                    const next = new URLSearchParams(prev);
                    Object.entries(changes).forEach(([k, v]) => (v === undefined || v === null || v === '' ? next.delete(k) : next.set(k, v)));
                    if (resetPage) next.delete('page');
                    return next;
                },
                { replace: true },
            );
        },
        [setParams],
    );

    const load = useCallback(() => {
        setLoading(true);
        const { page, limit, sort, order, ...filters } = query;
        api(`/admin/enquiries${buildQuery({ ...filters, page, limit, sort, order })}`, { auth: true })
            .then((r) => setData(r))
            .catch((e) => message.error(e.message))
            .finally(() => setLoading(false));
    }, [query, message]);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        window.addEventListener(ENQUIRIES_CHANGED, load);
        return () => window.removeEventListener(ENQUIRIES_CHANGED, load);
    }, [load]);

    // Debounced free-text search.
    useEffect(() => {
        if (searchText === query.search) return undefined;
        const t = setTimeout(() => update({ search: searchText.trim() }), 350);
        return () => clearTimeout(t);
    }, [searchText, query.search, update]);

    const setStatus = async (id, status) => {
        try {
            await api(`/admin/enquiries/${id}`, { method: 'PATCH', auth: true, body: { status } });
            message.success('Status updated');
            notifyEnquiriesChanged();
        } catch (e) {
            message.error(e.message);
        }
    };

    const removeOne = async (id) => {
        try {
            await api(`/admin/enquiries/${id}`, { method: 'DELETE', auth: true });
            message.success('Enquiry deleted');
            setSelected((s) => s.filter((x) => x !== id));
            notifyEnquiriesChanged();
        } catch (e) {
            message.error(e.message);
        }
    };

    const removeSelected = async () => {
        try {
            const r = await api('/admin/enquiries/bulk-delete', { method: 'POST', auth: true, body: { ids: selected } });
            message.success(`${r.deleted} enquir${r.deleted === 1 ? 'y' : 'ies'} deleted`);
            setSelected([]);
            notifyEnquiriesChanged();
        } catch (e) {
            message.error(e.message);
        }
    };

    const exportCsv = async () => {
        setExporting(true);
        try {
            const filters = Object.fromEntries(FILTER_KEYS.map((k) => [k, query[k]]));
            const res = await api(`/admin/enquiries/export${buildQuery(filters)}`, { auth: true, raw: true });
            const url = URL.createObjectURL(await res.blob());
            const a = document.createElement('a');
            a.href = url;
            a.download = `ibima-enquiries-${dayjs().format('YYYY-MM-DD')}.csv`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (e) {
            message.error(e.message);
        } finally {
            setExporting(false);
        }
    };

    const hasFilters = FILTER_KEYS.some((k) => query[k]);
    const sortOrder = (field) => (query.sort === field ? (query.order === 'asc' ? 'ascend' : 'descend') : null);

    const columns = [
        {
            title: 'Name / Organisation',
            dataIndex: 'name',
            sorter: true,
            sortOrder: sortOrder('name'),
            render: (v, r) => (
                <button type="button" className="min-w-0 cursor-pointer text-left" onClick={() => update({ view: r._id }, { resetPage: false })}>
                    <div className="font-medium text-slate-800 hover:text-brand-600">{v}</div>
                    <div className="text-[11.5px] text-slate-500">{r.organisation}</div>
                </button>
            ),
        },
        {
            title: 'Contact',
            dataIndex: 'email',
            responsive: ['md'],
            render: (v, r) => (
                <div className="text-[12px]">
                    <a href={`mailto:${v}`} className="block truncate">
                        {v}
                    </a>
                    <span className="text-slate-500">{r.phone}</span>
                </div>
            ),
        },
        { title: 'You are a', dataIndex: 'orgType', responsive: ['lg'], render: (v) => v || '—' },
        { title: 'Interested in', dataIndex: 'interest', responsive: ['lg'], render: (v) => interestLabel(v) || '—' },
        {
            title: 'Message',
            dataIndex: 'message',
            responsive: ['xl'],
            width: 240,
            ellipsis: { showTitle: false },
            render: (v) => (
                <Tooltip title={v} placement="topLeft">
                    <span className="text-slate-600">{v}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Received',
            dataIndex: 'createdAt',
            sorter: true,
            sortOrder: sortOrder('createdAt'),
            responsive: ['sm'],
            width: 150,
            render: (v) => <span className="text-[12px] text-slate-600">{fmtDateTime(v)}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 124,
            fixed: 'right',
            render: (v, r) => (
                <Select size="small" value={v} options={STATUS_OPTIONS} onChange={(s) => setStatus(r._id, s)} style={{ width: 112 }} popupMatchSelectWidth={false} />
            ),
        },
        {
            title: '',
            key: 'actions',
            width: 70,
            fixed: 'right',
            align: 'right',
            render: (_, r) => (
                <div className="flex justify-end gap-0.5">
                    <Tooltip title="View">
                        <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => update({ view: r._id }, { resetPage: false })} />
                    </Tooltip>
                    <Popconfirm title="Delete this enquiry?" okText="Delete" okButtonProps={{ danger: true }} onConfirm={() => removeOne(r._id)}>
                        <Tooltip title="Delete">
                            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Card styles={{ body: { padding: 0 } }}>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-3">
                <Input
                    allowClear
                    prefix={<SearchOutlined className="text-slate-400" />}
                    placeholder="Search name, organisation, email, phone, message"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="!w-full sm:!w-72"
                />
                <Select allowClear placeholder="Status" value={query.status || undefined} options={STATUS_OPTIONS} onChange={(v) => update({ status: v })} className="!w-[calc(50%-4px)] sm:!w-32" />
                <Select
                    allowClear
                    placeholder="You are a"
                    value={query.orgType || undefined}
                    options={ORG_TYPES.map((t) => ({ value: t, label: t }))}
                    onChange={(v) => update({ orgType: v })}
                    className="!w-[calc(50%-4px)] sm:!w-44"
                    popupMatchSelectWidth={false}
                />
                <Select
                    allowClear
                    placeholder="Interested in"
                    value={query.interest || undefined}
                    options={INTEREST_OPTIONS}
                    onChange={(v) => update({ interest: v })}
                    className="!w-full sm:!w-48"
                    popupMatchSelectWidth={false}
                />
                <DatePicker.RangePicker
                    value={query.from && query.to ? [dayjs(query.from), dayjs(query.to)] : null}
                    onChange={(r) => update({ from: r?.[0]?.format('YYYY-MM-DD'), to: r?.[1]?.format('YYYY-MM-DD') })}
                    className="!w-full sm:!w-60"
                    allowEmpty={[false, false]}
                />
                {hasFilters && (
                    <Button
                        icon={<ClearOutlined />}
                        onClick={() => {
                            setSearchText('');
                            update(Object.fromEntries(FILTER_KEYS.map((k) => [k, ''])));
                        }}
                    >
                        Clear
                    </Button>
                )}
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
                <span className="text-[12px] text-slate-500">
                    {selected.length ? `${selected.length} selected` : `${data.total} enquir${data.total === 1 ? 'y' : 'ies'}${hasFilters ? ' match the filters' : ''}`}
                </span>
                <div className="flex gap-2">
                    {selected.length > 0 && (
                        <Popconfirm title={`Delete ${selected.length} enquiries?`} description="This cannot be undone." okText="Delete" okButtonProps={{ danger: true }} onConfirm={removeSelected}>
                            <Button danger icon={<DeleteOutlined />}>
                                Delete selected
                            </Button>
                        </Popconfirm>
                    )}
                    <Button icon={<ReloadOutlined />} onClick={load} loading={loading}>
                        Refresh
                    </Button>
                    <Button icon={<DownloadOutlined />} onClick={exportCsv} loading={exporting} disabled={!data.total}>
                        Export CSV
                    </Button>
                </div>
            </div>

            <Table
                rowKey="_id"
                size="small"
                loading={loading}
                columns={columns}
                dataSource={data.items}
                rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
                rowClassName={(r) => (r.status === 'new' ? 'font-medium' : '')}
                scroll={{ x: 'max-content' }}
                onChange={(pagination, _filters, sorter) => {
                    // No sort selected falls back to newest first (the API default).
                    update(
                        {
                            page: pagination.current > 1 ? pagination.current : '',
                            limit: pagination.pageSize !== 10 ? pagination.pageSize : '',
                            sort: sorter?.order ? sorter.field : '',
                            order: sorter?.order === 'ascend' ? 'asc' : '',
                        },
                        { resetPage: false },
                    );
                }}
                pagination={{
                    current: query.page,
                    pageSize: query.limit,
                    total: data.total,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    size: 'small',
                    showTotal: (t, [a, b]) => `${a}–${b} of ${t}`,
                    className: '!px-3',
                }}
            />

            <EnquiryDrawer id={viewId} onClose={() => update({ view: '' }, { resetPage: false })} />
        </Card>
    );
};

export default EnquiriesPage;
