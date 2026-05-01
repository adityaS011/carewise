/**
 * MUI Theme Configuration
 *
 * Converts our design tokens into a comprehensive MUI dark theme.
 * All component-level overrides live here so feature components
 * never need to repeat the same sx values.
 *
 * Architecture rule:
 *   tokens.ts  →  muiTheme.ts (maps tokens to MUI)  →  components use MUI defaults
 *   Feature components use `sx` only for one-off layout, not for design system colors.
 *
 * Components overridden:
 *   MuiButton          — size scale (sm/md/lg), variant colors, active press animation
 *   MuiIconButton      — consistent border-radius and transition
 *   MuiCard            — dark surface, token border, large radius, card shadow
 *   MuiPaper           — dark background, token border (used by menus, dropdowns)
 *   MuiChip            — pill shape, small font, for StatusBadge base
 *   MuiLinearProgress  — rounded track + bar, for ProgressBar base
 *   MuiAvatar          — inherits font, bold weight, for Avatar base
 *   MuiOutlinedInput   — token border colors, focus cyan, compact padding
 *   MuiInputLabel      — muted label, cyan on focus
 *   MuiSelect          — muted caret, compact select padding
 *   MuiMenuItem        — hover/selected states using overlay tokens
 *   MuiDrawer          — elevated dark bg, no shadow, border-left separator
 *   MuiTooltip         — dark overlay bg, token border, small text
 *   MuiDivider         — token border color
 *   MuiToggleButtonGroup/Button — used by ViewToggle grid/list switcher
 */
import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';

const t = tokens.colors;

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: t.brand },
    error:      { main: t.accents.red },
    warning:    { main: t.accents.orange },
    success:    { main: t.accents.green },
    info:       { main: t.accents.blue },
    background: { default: t.bg.page, paper: t.bg.surface },
    text:       { primary: t.text.primary, secondary: t.text.secondary },
    divider:    t.border,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSize: 14,
  },
  shape: { borderRadius: 10 },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          fontWeight: 600,
          letterSpacing: '0.01em',
          textTransform: 'none',
          transition: tokens.transition,
        },
        sizeSmall:  { fontSize: '0.78rem', height: 30, padding: '0 12px' },
        sizeMedium: { fontSize: '0.85rem', height: 36, padding: '0 16px' },
        sizeLarge:  { fontSize: '0.90rem', height: 42, padding: '0 22px' },
        contained:  { '&:active': { transform: 'scale(0.98)' } },
        outlined:   { borderColor: t.border, '&:hover': { borderColor: t.borderHover } },
        text: {
          background: 'rgba(255,255,255,0.05)',
          '&:hover':  { background: 'rgba(255,255,255,0.09)' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: tokens.radius.md, transition: tokens.transition },
        sizeSmall: { fontSize: '0.78rem', padding: 6 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: t.bg.surface,
          backgroundImage: 'none',
          border: `1px solid ${t.border}`,
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadow.card,
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none', border: `1px solid ${t.border}` },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          justifySelf: 'start', // prevent horizontal stretching in CSS grid cells (grid-item default is justify-self:stretch)
          alignSelf: 'center',  // vertically center within the cell
          borderRadius: '99px',
          fontFamily: 'inherit',
          fontSize: '0.75rem',
          fontWeight: 600,
          height: 24,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root:  { background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' },
        bar:   { borderRadius: '99px' },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { fontFamily: 'inherit', fontSize: '0.75rem', fontWeight: 700 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.84rem',
          '& fieldset': { borderColor: t.border },
          '&:hover fieldset': { borderColor: t.borderHover },
          '&.Mui-focused fieldset': { borderColor: t.brand },
        },
        input: { padding: '9px 12px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.84rem', color: t.text.muted, '&.Mui-focused': { color: t.brand } },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: t.text.muted },
        select: { fontSize: '0.84rem', padding: '7px 12px' },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.84rem',
          '&.Mui-selected':       { background: t.bg.overlay },
          '&.Mui-selected:hover': { background: t.bg.overlay },
          '&:hover':              { background: t.bg.elevated },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: t.bg.elevated,
          backgroundImage: 'none',
          border: 'none',
          borderLeft: `1px solid ${t.border}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: t.bg.overlay,
          border: `1px solid ${t.border}`,
          borderRadius: tokens.radius.md,
          fontSize: '0.75rem',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: tokens.radius.md, fontSize: '0.8rem', padding: '9px 12px' },
        standardError:   { background: 'rgba(239,68,68,0.1)',   border: '1px solid rgba(239,68,68,0.2)',   color: t.accents.red    },
        standardWarning: { background: 'rgba(245,158,11,0.1)',  border: '1px solid rgba(245,158,11,0.2)',  color: t.accents.orange },
        standardSuccess: { background: 'rgba(16,185,129,0.1)',  border: '1px solid rgba(16,185,129,0.2)',  color: t.accents.green  },
        standardInfo:    { background: 'rgba(59,130,246,0.1)',  border: '1px solid rgba(59,130,246,0.2)',  color: t.accents.blue   },
        icon:            { alignItems: 'center', padding: 0 },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: t.border } },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { background: t.bg.elevated, border: `1px solid ${t.border}`, overflow: 'hidden' },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '0 !important',
          color: t.text.muted,
          fontFamily: 'inherit',
          textTransform: 'none',
          transition: tokens.transition,
          '&.Mui-selected': { background: t.brand, color: '#fff', '&:hover': { background: t.brand } },
          '&:hover': { background: t.bg.overlay, color: t.text.primary },
        },
      },
    },
  },
});
