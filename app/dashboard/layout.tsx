'use client';

import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Badge } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CarOutlined,
  DollarOutlined,
  ShopOutlined,
  ToolOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  DashboardOutlined,
  CalendarOutlined,
  SafetyOutlined,
  WalletOutlined,
  SettingOutlined,
  BellOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSED = 64;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'hr',
      icon: <TeamOutlined />,
      label: 'Human Resources',
      children: [
        { key: '/dashboard/employees', icon: <UserOutlined />, label: 'Employees' },
        { key: '/dashboard/attendance', icon: <ClockCircleOutlined />, label: 'Attendance' },
        { key: '/dashboard/leave', icon: <CalendarOutlined />, label: 'Long Leave' },
        { key: '/dashboard/payroll', icon: <DollarOutlined />, label: 'Payroll' },
      ],
    },
    {
      key: 'fleet',
      icon: <CarOutlined />,
      label: 'Fleet Management',
      children: [
        { key: '/dashboard/vehicles', icon: <CarOutlined />, label: 'Vehicles' },
        { key: '/dashboard/fleet/assignments', icon: <FileDoneOutlined />, label: 'Assignments' },
        { key: '/dashboard/fleet/fuel-entries', icon: <DollarOutlined />, label: 'Fuel Entries' },
        { key: '/dashboard/fleet/maintenance', icon: <ToolOutlined />, label: 'Maintenance' },
      ],
    },
    {
      key: 'operations',
      icon: <AppstoreOutlined />,
      label: 'Operations',
      children: [
        { key: '/dashboard/clients', icon: <ShopOutlined />, label: 'Clients' },
        { key: '/dashboard/finance', icon: <WalletOutlined />, label: 'Finance' },
        { key: '/dashboard/finance/advances', icon: <DollarOutlined />, label: 'Advances' },
      ],
    },
    {
      key: 'inventory',
      icon: <SafetyOutlined />,
      label: 'Inventory',
      children: [
        { key: '/dashboard/inventory/general', icon: <ToolOutlined />, label: 'General Items' },
        { key: '/dashboard/inventory/restricted', icon: <SafetyOutlined />, label: 'Restricted Items' },
      ],
    },
    {
      key: 'administration',
      icon: <SettingOutlined />,
      label: 'Administration',
      children: [
        { key: '/dashboard/administration/roles', label: 'Roles & Permissions' },
        { key: '/dashboard/administration/passwords', label: 'Employee Passwords' },
        { key: '/dashboard/settings', label: 'Company Settings' },
      ],
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', onClick: logout },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Fixed Dark Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={SIDEBAR_WIDTH}
        collapsedWidth={SIDEBAR_COLLAPSED}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#0f172a',
          borderRight: '1px solid #1e293b',
          zIndex: 200,
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            height: 52,
            display: 'flex',
            alignItems: 'center',
            padding: collapsed ? '0 16px' : '0 14px',
            gap: 10,
            borderBottom: '1px solid #1e293b',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: '#fff',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src="/images/flash-logo.jpg"
              alt="Flash Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          {!collapsed && (
            <div>
              <div
                style={{
                  color: '#f1f5f9',
                  fontWeight: 700,
                  fontSize: 13,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                Flash Tech
              </div>
              <div
                style={{
                  color: '#475569',
                  fontSize: 9,
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: 1,
                }}
              >
                ERP System
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={['hr', 'fleet', 'operations', 'inventory']}
          items={menuItems}
          onClick={({ key }) => {
            if (key.startsWith('/')) {
              // { scroll: false } keeps the user's scroll position when navigating
              // between pages — prevents the jarring "scroll to top" on every click.
              router.push(key, { scroll: false });
            }
          }}
          style={{
            background: 'transparent',
            borderRight: 0,
            fontSize: 12,
            paddingTop: 4,
          }}
        />
      </Sider>

      {/* Main layout (header + content) */}
      <Layout
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH,
          transition: 'margin-left 0.2s ease',
          background: '#f1f5f9',
          minHeight: '100vh',
        }}
      >
        {/* Sticky compact header */}
        <Header
          style={{
            background: '#ffffff',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            height: 52,
            lineHeight: '52px',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          {/* Collapse toggle */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: '#64748b', width: 36, height: 36, padding: 0 }}
          />

          {/* Right controls */}
          <Space size={2}>
            <Badge count={0} showZero={false}>
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 15, color: '#64748b' }} />}
                style={{ width: 34, height: 34, padding: 0 }}
              />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  padding: '3px 8px',
                  borderRadius: 4,
                  marginLeft: 4,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  size={26}
                  style={{ backgroundColor: '#4f46e5', flexShrink: 0 }}
                />
                <div style={{ lineHeight: 1.25 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#1e293b',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.name || 'Admin'}
                  </div>
                  <div style={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {user.email}
                  </div>
                </div>
              </div>
            </Dropdown>
          </Space>
        </Header>

        {/* Page content */}
        <Content
          style={{
            margin: '14px',
            padding: 0,
            background: 'transparent',
            minHeight: `calc(100vh - 52px - 28px)`,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 6,
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
