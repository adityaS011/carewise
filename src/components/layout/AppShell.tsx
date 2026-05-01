'use client';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Activity, BarChart3, ChevronLeft, ChevronRight, LayoutDashboard, LogOut, Menu, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { GlobalStyles } from '@/theme/GlobalStyles';
import { tokens } from '@/theme/tokens';
import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/Button';

const t = tokens.colors;
const FULL_W = 220;
const MINI_W = 64;

const NAV = [
  { href: '/',          label: 'Home',      icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: BarChart3       },
  { href: '/patients',  label: 'Patients',  icon: Users           },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ─── Sidebar content — shared between inline sidebar and mobile Drawer ────────
type SidebarProps = {
  pathname: string;
  collapsed: boolean;
  name: string;
  onLogout: () => void;
  onToggle?: () => void;   // only shown on desktop
};

function SidebarContent({ pathname, collapsed, name, onLogout, onToggle }: SidebarProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: collapsed ? '20px 8px' : '20px 12px', overflow: 'hidden' }}>

      {/* Logo row + collapse toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '28px' }}>
        <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', gap: '9px', color: t.brand, fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', p: '6px 8px', borderRadius: tokens.radius.md, textDecoration: 'none', flex: 1, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Activity size={20} style={{ flexShrink: 0 }} />
          {!collapsed && 'CareWise'}
        </Box>
        {onToggle && (
          <Box component="button" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: `1px solid ${t.border}`, borderRadius: tokens.radius.sm, color: t.text.muted, cursor: 'pointer', flexShrink: 0, p: '4px', transition: tokens.transition, '&:hover': { color: t.text.primary, borderColor: t.borderHover, background: t.sidebar.hover } }}>
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </Box>
        )}
      </Box>

      {/* Nav links */}
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Box key={href} component={Link} href={href} title={collapsed ? label : undefined} sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: collapsed ? 0 : '10px', p: '9px 12px', borderRadius: tokens.radius.md, fontSize: '0.84rem', fontWeight: active ? 600 : 500, color: active ? '#fff' : t.sidebar.text, background: active ? t.sidebar.active : 'transparent', border: `1px solid ${active ? `${t.brand}22` : 'transparent'}`, textDecoration: 'none', transition: tokens.transition, '&:hover': { background: t.sidebar.hover, color: '#fff' } }}>
              <Icon size={16} />
              {!collapsed && label}
            </Box>
          );
        })}
      </Box>

      {/* User + logout */}
      <Box sx={{ pt: '14px', borderTop: `1px solid ${t.border}` }}>
        {collapsed ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar name={name} size={28} />
            <IconButton size="sm" onClick={onLogout} title="Log out" sx={{ color: t.text.muted }}><LogOut size={14} /></IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar name={name} size={30} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ fontSize: '0.82rem', fontWeight: 600, color: t.text.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</Box>
              <Box sx={{ fontSize: '0.72rem', color: t.text.muted }}>Care team</Box>
            </Box>
            <IconButton size="sm" onClick={onLogout} title="Log out" sx={{ color: t.text.muted }}><LogOut size={15} /></IconButton>
          </Box>
        )}

      </Box>
    </Box>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────
export function AppShell({ children }: { children: ReactNode }) {
  const pathname  = usePathname() ?? '/';
  const router    = useRouter();
  const isMobile  = useMediaQuery('(max-width: 768px)');
  const { user, logout } = useAuthStore();
  const name = user?.name ?? 'Clinician';

  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const onLogout = async () => { await logout(); router.replace('/login'); };
  const shared   = { pathname, name, onLogout };

  return (
    <>
      <GlobalStyles />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        {/* Mobile: overlay Drawer */}
        <MuiDrawer open={isMobile && mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: FULL_W, background: t.sidebar.bg, border: 'none', borderRight: `1px solid ${t.border}` } }}>
          <SidebarContent {...shared} collapsed={false} />
        </MuiDrawer>

        {/* Desktop / tablet: inline collapsible sidebar */}
        <Box component="aside" sx={{ display: { xs: 'none', sm: 'block' }, width: collapsed ? MINI_W : FULL_W, flexShrink: 0, background: t.sidebar.bg, borderRight: `1px solid ${t.border}`, transition: 'width 200ms ease', overflow: 'hidden' }}>
          <SidebarContent {...shared} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        </Box>

        {/* Main */}
        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg.page, minWidth: 0 }}>
          <Box component="header" sx={{ display: 'flex', alignItems: 'center', height: 60, px: { xs: '16px', sm: '28px' }, background: t.bg.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0, gap: '12px' }}>
            {/* Hamburger — mobile only */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton size="sm" onClick={() => setMobileOpen(true)} sx={{ color: t.text.muted }}><Menu size={18} /></IconButton>
            </Box>
            <Box>
              <Box sx={{ color: t.text.muted, fontSize: '0.75rem' }}>Healthcare operations</Box>
              <Box sx={{ color: t.text.primary, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{getGreeting()}, {name}</Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: '16px', sm: '24px 28px' } }}>
            {children}
          </Box>
        </Box>

      </Box>
    </>
  );
}
