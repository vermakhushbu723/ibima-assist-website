import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../auth';

const LoginPage = () => {
    const { admin, checking, login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = 'Sign in · IBima Admin';
    }, []);

    if (!checking && admin) return <Navigate to={location.state?.from || '/admin'} replace />;

    const onFinish = async ({ email, password }) => {
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate(location.state?.from || '/admin', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen place-items-center bg-[#f4f7fb] px-4 py-10">
            <div className="w-full max-w-[360px]">
                <div className="mb-5 flex flex-col items-center text-center">
                    <img src="/logo-ibima.png" alt="IBima Assist" className="h-10 w-auto" />
                    <h1 className="mt-4 text-[17px] font-bold text-slate-800">Website admin</h1>
                    <p className="mt-1 text-[12.5px] text-slate-500">Sign in to manage enquiries from the website</p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    {error && <Alert type="error" title={error} showIcon className="!mb-4" />}
                    <Form layout="vertical" requiredMark={false} onFinish={onFinish} size="middle">
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Enter your email' },
                                { type: 'email', message: 'Enter a valid email' },
                            ]}
                        >
                            <Input prefix={<MailOutlined className="text-slate-400" />} placeholder="admin@ibimaassist.in" autoComplete="username" />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Enter your password' }]}>
                            <Input.Password prefix={<LockOutlined className="text-slate-400" />} placeholder="••••••••" autoComplete="current-password" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Sign in
                        </Button>
                    </Form>
                </div>

                <p className="mt-4 text-center text-[12px] text-slate-500">
                    <a href="/" className="text-brand-600 hover:underline">
                        ← Back to website
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
