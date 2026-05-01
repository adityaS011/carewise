import { tokens } from '@/theme/tokens';

const t = tokens.colors;

// Responsive grid: 3 cols on mobile (Patient + Status + Risk), 5 on md+ (full table)
const cols = { xs: '1.4fr 0.9fr 0.7fr', md: '2fr 1fr 1fr 1.2fr 1fr' };

export const hideOnMobile = { display: { xs: 'none', md: 'block' } } as const;
export const hideOnMobileFlex = { display: { xs: 'none', md: 'flex' } } as const;

export const headerRowSx = {
  borderBottom: `1px solid ${t.border}`,
  display: 'grid',
  gridTemplateColumns: cols,
  p: '10px 20px',
} as const;

export const headerCellSx = {
  color: t.text.muted,
  fontSize: '0.72rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
} as const;

export const rowSx = {
  alignItems: 'center',
  borderBottom: `1px solid ${t.border}`,
  cursor: 'pointer',
  display: 'grid',
  fontFamily: 'inherit',
  gridTemplateColumns: cols,
  p: '12px 20px',
  textAlign: 'left',
  transition: tokens.transition,
  width: '100%',
  '&:last-child': { borderBottom: 0 },
  '&:hover': { background: t.bg.elevated },
} as const;

const ellipsis = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } as const;

export const nameWrapSx = { alignItems: 'center', display: 'flex', gap: '10px', minWidth: 0 } as const;
export const nameSx = { ...ellipsis, color: t.text.primary, fontSize: '0.84rem', fontWeight: 600 } as const;
export const conditionSx = { ...ellipsis, color: t.text.muted, fontSize: '0.72rem' } as const;
export const teamSx = { color: t.text.secondary, fontSize: '0.82rem' } as const;
export const riskWrapSx = { display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 80, pr: '12px' } as const;
export const riskValueSx = { color: t.text.secondary, fontSize: '0.78rem', fontWeight: 700 } as const;
export const vitalsSx = { color: t.text.muted, fontSize: '0.75rem' } as const;
export const emptySx = { color: t.text.muted, fontSize: '0.84rem', p: '32px 20px', textAlign: 'center' } as const;
