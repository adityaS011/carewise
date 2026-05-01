/**
 * Design Token System — Single Source of Truth
 *
 * All visual constants for the CareWise dark theme live here.
 * Every color, radius, shadow, and transition value is defined once
 * and referenced everywhere else (muiTheme.ts, components, sx props).
 *
 * Structure:
 *   tokens.colors.bg        — layered dark backgrounds (page → surface → elevated → overlay)
 *   tokens.colors.text       — text hierarchy (primary / secondary / muted)
 *   tokens.colors.border     — subtle white-alpha borders
 *   tokens.colors.brand      — primary cyan (#06b6d4), used for focus rings and CTAs
 *   tokens.colors.accents    — semantic accent palette (green=ok, orange=warn, red=alert, blue=info)
 *   tokens.colors.status     — per-PatientStatus fg/bg pairs consumed by StatusBadge
 *   tokens.colors.sidebar    — sidebar-specific colors (tighter contrast than main surface)
 *   tokens.radius            — consistent border-radius scale (sm → xl)
 *   tokens.shadow            — card and elevated-panel box-shadow presets
 *   tokens.transition        — single shared CSS transition string for uniform motion
 *
 * To change the theme: edit values here — every component updates automatically.
 * To add a new accent: add it to `accents`, then optionally map it in muiTheme.ts.
 */
export const tokens = {
  colors: {
    bg: {
      page: '#080b14',
      surface: '#0d1117',
      elevated: '#0f1623',
      overlay: '#1a2234',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
      muted: '#475569',
    },
    border: 'rgba(255,255,255,0.07)',
    borderHover: 'rgba(255,255,255,0.13)',
    brand: '#06b6d4',
    accents: {
      cyan:   '#06b6d4',
      green:  '#10b981',
      orange: '#f59e0b',
      purple: '#8b5cf6',
      red:    '#ef4444',
      blue:   '#3b82f6',
    },
    status: {
      Stable:     { fg: '#10b981', bg: 'rgba(16,185,129,0.12)' },
      Critical:   { fg: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
      Recovering: { fg: '#06b6d4', bg: 'rgba(6,182,212,0.12)'  },
      Review:     { fg: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    },
    sidebar: {
      bg:     '#060910',
      active: 'rgba(6,182,212,0.14)',
      hover:  'rgba(255,255,255,0.05)',
      text:   'rgba(255,255,255,0.55)',
      textHi: '#ffffff',
    },
  },
  radius: { sm: '6px', md: '10px', lg: '14px', xl: '20px' },
  shadow: {
    card: '0 1px 3px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
    elevated: '0 8px 32px rgba(0,0,0,0.7)',
  },
  transition: 'all 150ms ease',
} as const;

export type AccentKey = keyof typeof tokens.colors.accents;
