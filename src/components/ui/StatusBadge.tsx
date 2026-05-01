/**
 * StatusBadge — Patient Status Indicator
 *
 * Wraps MUI `Chip` with domain-specific styling for the four CareWise
 * patient statuses: Stable | Recovering | Review | Critical.
 *
 * Each status maps to a (fg, bg) color pair from `tokens.colors.status`:
 *   Stable     — green text, green-tinted bg
 *   Recovering — cyan text, cyan-tinted bg
 *   Review     — orange text, orange-tinted bg
 *   Critical   — red text, red-tinted bg
 *
 * The semi-transparent background (12% alpha) keeps the badge readable
 * against both dark card surfaces and drawer overlays.
 *
 * `StatusPill` is a backwards-compat alias — prefer `StatusBadge` in new code.
 *
 * Portability: copy this file + update `STATUS_MAP` keys/colors for your domain.
 *
 * @example
 *   <StatusBadge status="Critical" />
 *   <StatusBadge status="Stable" size="sm" />  // compact variant for list rows
 */
import Chip from '@mui/material/Chip';
import { PatientStatus } from '@/types/patient';
import { tokens } from '@/theme/tokens';

const STATUS_MAP = tokens.colors.status;

export type StatusBadgeProps = {
  status: PatientStatus;
  size?: 'sm' | 'md';
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { fg, bg } = STATUS_MAP[status] ?? { fg: '#94a3b8', bg: 'rgba(148,163,184,0.1)' };

  return (
    <Chip
      label={status}
      size={size === 'sm' ? 'small' : 'medium'}
      sx={{
        background: bg,
        border: `1px solid ${fg}44`,
        color: fg,
        '& .MuiChip-label': { px: size === 'sm' ? 1 : 1.25 },
        height: size === 'sm' ? 20 : 24,
        fontSize: size === 'sm' ? '0.68rem' : '0.75rem',
      }}
    />
  );
}

// Backwards-compat alias
export function StatusPill({ status }: { status: PatientStatus }) {
  return <StatusBadge status={status} />;
}
