import React, { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Breadcrumb, Button, Drawer, Dropdown, Grid, Layout, Menu, Tooltip } from 'antd';
import {
    DashboardOutlined,
    ExportOutlined,
    LogoutOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useAuth } from './auth';
import { api } from '../lib/api';
import { ENQUIRIES_CHANGED } from './constants';

const { Sider, Header, Content } = Layout;

const PAGES = {
    '/admin': { title: 'Dashboard', crumbs: ['Dashboard'] },
    '/admin/enquiries': { title: 'Contact enquiries', crumbs: ['Website forms', 'Contact enquiries'] },
    '/admin/settings': { title: 'Settings', crumbs: ['Account', 'Settings'] },
};

const Brand = ({ collapsed }) => (
    <Link to="/admin" className="flex h-[52px] items-center gap-2.5 border-b border-white/10 px-4">
        <img src="/logo-ibima-icon.png" alt="" className="h-7 w-7 shrink-0 rounded bg-white p-0.5" />
        {!collapsed && (
            <span className="min-w-0 leading-tight">
                <span className="block truncate text-[13px] font-bold text-white">IBima Assist</span>
                <span className="block text-[10.5px] uppercase tracking-[0.14em] text-slate-400">Website admin</span>
            </span>
        )}
    </Link>
);

const SideMenu = ({ newCount, onNavigate }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const selected = pathname.replace(/\/+$/, '') || '/admin';

    const items = [
        {
            type: 'group',
            label: 'Overview',
            children: [{ key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard' }],
        },
        {
            type: 'group',
            label: 'Website forms',
            children: [
                {
                    key: '/admin/enquiries',
                    icon: <MailOutlined />,
                    label: (
                        <span className="flex items-center justify-between gap-2">
                            Contact enquiries
                            {newCount > 0 && <Badge count={newCount} size="small" color="#f59e0b" />}
                        </span>
                    ),
                },
            ],
        },
        {
            type: 'group',
            label: 'Account',
            children: [{ key: '/admin/settings', icon: <SettingOutlined />, label: 'Settings' }],
        },
    ];

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selected]}
            items={items}
            onClick={({ key }) => {
                navigate(key);
                onNavigate?.();
            }}
            className="!border-0 pt-2 text-[13px]"
        />
    );
};

const AdminLayout = () => {
    const screens = Grid.useBreakpoint();
    const isMobile = !screens.lg;
    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [newCount, setNewCount] = useState(0);
    const { admin, logout } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const page = PAGES[pathname.replace(/\/+$/, '') || '/admin'] || PAGES['/admin'];

    const loadNewCount = useCallback(() => {
        api('/admin/enquiries?status=new&limit=1', { auth: true })
            .then((r) => setNewCount(r.total))
            .catch(() => {});
    }, []);

    useEffect(() => {
        loadNewCount();
        window.addEventListener(ENQUIRIES_CHANGED, loadNewCount);
        return () => window.removeEventListener(ENQUIRIES_CHANGED, loadNewCount);
    }, [loadNewCount]);

    useEffect(() => {
        document.title = `${page.title} · IBima Admin`;
    }, [page.title]);

    const userMenu = {
        items: [
            {
                key: 'who',
                disabled: true,
                label: (
                    <div className="py-0.5">
                        <div className="text-[13px] font-semibold text-slate-800">{admin?.name}</div>
                        <div className="text-[11.5px] text-slate-500">{admin?.email}</div>
                    </div>
                ),
            },
            { type: 'divider' },
            { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
            { key: 'site', icon: <ExportOutlined />, label: 'View website' },
            { type: 'divider' },
            { key: 'logout', icon: <LogoutOutlined />, label: 'Sign out', danger: true },
        ],
        onClick: ({ key }) => {
            if (key === 'settings') navigate('/admin/settings');
            if (key === 'site') window.open('/', '_blank', 'noopener');
            if (key === 'logout') {
                logout();
                navigate('/admin/login', { replace: true });
            }
        },
    };

    const siteLink = (
        <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mx-3 mb-3 flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-[12px] text-slate-300 hover:border-white/25 hover:text-white"
        >
            <ExportOutlined /> {!collapsed || isMobile ? 'View website' : null}
        </a>
    );

    return (
        <Layout className="min-h-screen">
            {isMobile ? (
                <Drawer
                    placement="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    size={232}
                    closable={false}
                    styles={{ body: { padding: 0, background: '#04142e' }, header: { display: 'none' } }}
                >
                    <div className="flex h-full flex-col">
                        <Brand />
                        <div className="flex-1 overflow-y-auto">
                            <SideMenu newCount={newCount} onNavigate={() => setDrawerOpen(false)} />
                        </div>
                        {siteLink}
                    </div>
                </Drawer>
            ) : (
                <Sider
                    width={224}
                    collapsedWidth={64}
                    collapsed={collapsed}
                    trigger={null}
                    className="!fixed inset-y-0 left-0 z-20"
                >
                    <div className="flex h-full flex-col">
                        <Brand collapsed={collapsed} />
                        <div className="flex-1 overflow-y-auto">
                            <SideMenu newCount={newCount} />
                        </div>
                        {siteLink}
                    </div>
                </Sider>
            )}

            <Layout
                style={{ marginLeft: isMobile ? 0 : collapsed ? 64 : 224, transition: 'margin-left 0.2s' }}
            >
                <Header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 !leading-none">
                    <Button
                        type="text"
                        aria-label="Toggle menu"
                        icon={collapsed || isMobile ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => (isMobile ? setDrawerOpen(true) : setCollapsed((c) => !c))}
                    />
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-[14px] font-semibold text-slate-800">{page.title}</div>
                        <Breadcrumb
                            className="!mt-0.5 hidden !text-[11.5px] sm:block"
                            items={[{ title: 'Admin' }, ...page.crumbs.map((c) => ({ title: c }))]}
                        />
                    </div>
                    <Tooltip title="New enquiries">
                        <Badge count={newCount} size="small" offset={[-2, 2]}>
                            <Button
                                type="text"
                                icon={<MailOutlined />}
                                aria-label="New enquiries"
                                onClick={() => navigate('/admin/enquiries?status=new')}
                            />
                        </Badge>
                    </Tooltip>
                    <Dropdown menu={userMenu} trigger={['click']} placement="bottomRight">
                        <button type="button" className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 hover:bg-slate-100">
                            <Avatar size={28} style={{ background: '#01a0fe' }} icon={<UserOutlined />} />
                            <span className="hidden text-[12.5px] font-medium text-slate-700 md:inline">{admin?.name}</span>
                        </button>
                    </Dropdown>
                </Header>

                <Content className="p-3 sm:p-4">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
