/**
 * ProgressBar — Risk/Progress Indicator
 *
 * Wraps MUI `LinearProgress` with automatic semantic coloring and an
 * optional label row. Used everywhere a percentage value needs visualisation
 * — patient risk scores, task completion, capacity metrics.
 *
 * Auto-color thresholds (override with explicit `color` prop):
 *   < 70%  → green   (accents.green)  — within normal range
 *   70–89% → orange  (accents.orange) — approaching warning level
 *   ≥ 90%  → red     (accents.red)    — critical / needs attention
 *
 * Props:
 *   value      — 0–100, clamped at 100 to prevent overflow
 *   color      — hex/rgba override; bypasses auto-color logic
 *   height     — bar thickness in px (default 6)
 *   showLabel  — renders a row above the bar with label text + percentage
 *   label      — left-side descriptor shown when showLabel=true
 *   aria-label — accessible label for screen readers
 *
 * MUI handles the fill animation natively via CSS transitions — no custom
 * animation logic required.
 *
 * @example
 *   <ProgressBar value={82} showLabel label="ICU capacity" />
 *   <ProgressBar value={patient.risk} height={4} aria-label={`Risk ${patient.risk}%`} />
 */
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

function autoColor(value: number) {
  if (value >= 90) return t.accents.red;
  if (value >= 70) return t.accents.orange;
  return t.accents.green;
}

export type ProgressBarProps = {
  value: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  'aria-label'?: string;
};

export function ProgressBar({
  value,
  color,
  height = 6,
  showLabel,
  label,
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const resolvedColor = color ?? autoColor(value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: showLabel ? '6px' : 0, width: '100%' }}>
      {showLabel && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <span style={{ fontSize: '0.78rem', color: t.text.secondary }}>{label}</span>}
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: resolvedColor }}>{value}%</span>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={Math.min(value, 100)}
        aria-label={ariaLabel}
        sx={{
          height,
          '& .MuiLinearProgress-bar': { background: resolvedColor },
        }}
      />
    </Box>
  );
}
