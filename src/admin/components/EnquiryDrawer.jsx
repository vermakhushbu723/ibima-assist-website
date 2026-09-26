import React, { useEffect, useState } from 'react';
import { App, Button, Descriptions, Drawer, Input, Popconfirm, Select, Skeleton, Space } from 'antd';
import { DeleteOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { api } from '../../lib/api';
import { interestLabel } from '../../data/enquiry';
import { STATUS_OPTIONS, fmtDateTime, notifyEnquiriesChanged } from '../constants';

// Full view of one Contact-form enquiry: every submitted field, plus the
// admin-only workflow status and internal notes.
const EnquiryDrawer = ({ id, onClose, onChanged }) => {
    const { message } = App.useApp();
    const [item, setItem] = useState(null);
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        setItem(null);
        setError('');
        api(`/admin/enquiries/${id}`, { auth: true })
            .then((r) => {
                setItem(r);
                setNotes(r.notes || '');
            })
            .catch((e) => setError(e.message));
    }, [id]);

    const patch = async (body, okText) => {
        setSaving(true);
        try {
            const r = await api(`/admin/enquiries/${id}`, { method: 'PATCH', auth: true, body });
            setItem(r);
            message.success(okText);
            onChanged?.();
            notifyEnquiriesChanged();
        } catch (e) {
            message.error(e.message);
        } finally {
            setSaving(false);
        }
    };

    const remove = async () => {
        try {
            await api(`/admin/enquiries/${id}`, { method: 'DELETE', auth: true });
            message.success('Enquiry deleted');
            onChanged?.();
            notifyEnquiriesChanged();
            onClose();
        } catch (e) {
            message.error(e.message);
        }
    };

    return (
        <Drawer
            open={Boolean(id)}
            onClose={onClose}
            size={520}
            title={item ? item.name : 'Enquiry'}
            extra={
                item && (
                    <Popconfirm title="Delete this enquiry?" description="This cannot be undone." okText="Delete" okButtonProps={{ danger: true }} onConfirm={remove}>
                        <Button danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                )
            }
            styles={{ body: { padding: 16 } }}
        >
            {error && <p className="text-[12.5px] text-red-600">{error}</p>}
            {!item && !error && <Skeleton active />}
            {item && (
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2.5">
                        <span className="text-[12px] font-medium text-slate-600">Status</span>
                        <Select
                            value={item.status}
                            options={STATUS_OPTIONS}
                            onChange={(status) => patch({ status }, 'Status updated')}
                            disabled={saving}
                            style={{ width: 140 }}
                        />
                        <Space className="ml-auto" size={6}>
                            <Button href={`mailto:${item.email}`} icon={<MailOutlined />}>
                                Email
                            </Button>
                            <Button href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`} icon={<PhoneOutlined />}>
                                Call
                            </Button>
                        </Space>
                    </div>

                    <Descriptions
                        bordered
                        size="small"
                        column={1}
                        styles={{ label: { width: 130, fontSize: 12 }, content: { fontSize: 12.5 } }}
                        items={[
                            { key: 'name', label: 'Full name', children: item.name },
                            { key: 'org', label: 'Organisation', children: item.organisation },
                            { key: 'email', label: 'Work email', children: <a href={`mailto:${item.email}`}>{item.email}</a> },
                            { key: 'phone', label: 'Phone', children: item.phone },
                            { key: 'orgType', label: 'You are a', children: item.orgType || '—' },
                            { key: 'interest', label: 'Interested in', children: interestLabel(item.interest) || '—' },
                            {
                                key: 'message',
                                label: 'What are you trying to fix?',
                                children: <div className="whitespace-pre-wrap">{item.message}</div>,
                            },
                            { key: 'received', label: 'Received', children: fmtDateTime(item.createdAt) },
                            { key: 'updated', label: 'Last updated', children: fmtDateTime(item.updatedAt) },
                            { key: 'source', label: 'Submitted from', children: item.source || '/contact' },
                        ]}
                    />

                    <div>
                        <div className="mb-1.5 text-[12px] font-medium text-slate-600">Internal notes</div>
                        <Input.TextArea
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Call outcome, follow-up date, who owns it…"
                            maxLength={4000}
                        />
                        <div className="mt-2 flex justify-end">
                            <Button
                                type="primary"
                                loading={saving}
                                disabled={notes === (item.notes || '')}
                                onClick={() => patch({ notes }, 'Notes saved')}
                            >
                                Save notes
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Drawer>
    );
};

export default EnquiryDrawer;
