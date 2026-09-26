import React, { useState } from 'react';
import { App, Button, Card, Descriptions, Form, Input } from 'antd';
import { api } from '../../lib/api';
import { useAuth } from '../auth';
import { fmtDateTime } from '../constants';

const SettingsPage = () => {
    const { message } = App.useApp();
    const { admin, setAdmin } = useAuth();
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [pwForm] = Form.useForm();

    const saveProfile = async ({ name }) => {
        setSavingProfile(true);
        try {
            const r = await api('/admin/auth/profile', { method: 'PATCH', auth: true, body: { name } });
            setAdmin(r.admin);
            message.success('Profile updated');
        } catch (e) {
            message.error(e.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const changePassword = async ({ currentPassword, newPassword }) => {
        setSavingPassword(true);
        try {
            await api('/admin/auth/change-password', { method: 'POST', auth: true, body: { currentPassword, newPassword } });
            message.success('Password changed');
            pwForm.resetFields();
        } catch (e) {
            message.error(e.message);
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <div className="grid max-w-4xl gap-3 sm:gap-4 lg:grid-cols-2">
            <Card title="Profile">
                <Descriptions
                    size="small"
                    column={1}
                    className="!mb-4"
                    items={[
                        { key: 'email', label: 'Email', children: admin?.email },
                        { key: 'last', label: 'Last sign-in', children: fmtDateTime(admin?.lastLoginAt) },
                    ]}
                />
                <Form layout="vertical" requiredMark={false} initialValues={{ name: admin?.name }} onFinish={saveProfile}>
                    <Form.Item name="name" label="Display name" rules={[{ required: true, message: 'Name is required' }]}>
                        <Input maxLength={80} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={savingProfile}>
                        Save profile
                    </Button>
                </Form>
            </Card>

            <Card title="Change password">
                <Form form={pwForm} layout="vertical" requiredMark={false} onFinish={changePassword}>
                    <Form.Item name="currentPassword" label="Current password" rules={[{ required: true, message: 'Enter your current password' }]}>
                        <Input.Password autoComplete="current-password" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New password"
                        rules={[
                            { required: true, message: 'Enter a new password' },
                            { min: 6, message: 'At least 6 characters' },
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm new password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Confirm the new password' },
                            ({ getFieldValue }) => ({
                                validator: (_, v) =>
                                    !v || v === getFieldValue('newPassword') ? Promise.resolve() : Promise.reject(new Error('Passwords do not match')),
                            }),
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={savingPassword}>
                        Update password
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default SettingsPage;
