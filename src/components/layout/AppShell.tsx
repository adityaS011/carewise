'use client';

import Box from '@mui/material/Box';
import { Activity, BarChart3, LayoutDashboard, LogOut, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { GlobalStyles } from '@/theme/GlobalStyles';
import { tokens } from '@/theme/tokens';
import { Avatar } from '@/components/ui/Avatar';
import { IconButton } from '@/components/ui/Button';

const t = tokens.colors;

const NAV = [
  { href: '/dashboard', label: 'Home',      icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: BarChart3       },
  { href: '/patients',  label: 'Patients',  icon: Users           },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuthStore();
  const name = user?.name ?? 'Clinician';

  const onLogout = async () => { await logout(); router.replace('/login'); };

  return (
    <>
      <GlobalStyles />
      <Box sx={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: '100vh', overflow: 'hidden' }}>

        {/* Sidebar */}
        <Box component="aside" sx={{ background: t.sidebar.bg, borderRight: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', p: '20px 12px', overflow: 'hidden' }}>
          <Box component={Link} href="/dashboard" sx={{ display: 'flex', alignItems: 'center', gap: '9px', color: t.brand, fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', mb: '28px', p: '6px 8px', borderRadius: tokens.radius.md, textDecoration: 'none' }}>
            <Activity size={20} /> CareWise
          </Box>

          <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = (pathname ?? '').startsWith(href);
              return (
                <Box
                  key={href}
                  component={Link}
                  href={href}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    p: '9px 12px', borderRadius: tokens.radius.md,
                    fontSize: '0.84rem', fontWeight: active ? 600 : 500,
                    color: active ? '#fff' : t.sidebar.text,
                    background: active ? t.sidebar.active : 'transparent',
                    border: `1px solid ${active ? `${t.brand}22` : 'transparent'}`,
                    textDecoration: 'none',
                    transition: tokens.transition,
                    '&:hover': { background: t.sidebar.hover, color: '#fff' },
                  }}
                >
                  <Icon size={16} /> {label}
                </Box>
              );
            })}
          </Box>

          {/* Footer */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', pt: '14px', borderTop: `1px solid ${t.border}` }}>
            <Avatar name={name} size={30} />
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Box sx={{ fontSize: '0.82rem', fontWeight: 600, color: t.text.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</Box>
              <Box sx={{ fontSize: '0.72rem', color: t.text.muted }}>Care team</Box>
            </Box>
            <IconButton size="sm" onClick={onLogout} title="Log out" sx={{ color: t.text.muted }}><LogOut size={15} /></IconButton>
          </Box>
        </Box>

        {/* Main */}
        <Box component="main" sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: t.bg.page }}>
          <Box component="header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, px: '28px', background: t.bg.surface, borderBottom: `1px solid ${t.border}`, flexShrink: 0 }}>
            <Box>
              <Box sx={{ color: t.text.muted, fontSize: '0.75rem' }}>Healthcare operations</Box>
              <Box sx={{ color: t.text.primary, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{getGreeting()}, {name}</Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1, overflowY: 'auto', p: '24px 28px' }}>{children}</Box>
        </Box>

      </Box>
    </>
  );
}
