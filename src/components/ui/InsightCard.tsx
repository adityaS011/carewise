/**
 * InsightCard — KPI / Metric Summary Card
 *
 * Custom dashboard metric card with no direct MUI equivalent.
 * Built entirely on MUI `Card` + `Box` with `sx` props — no styled-components.
 *
 * Visual anatomy (top to bottom):
 *   ::before pseudo-element  — 2px solid accent stripe at the very top
 *   Header row               — UPPERCASE label (left) + icon in tinted box (right)
 *   Value                    — large bold number/string in accent color (2.4rem)
 *   Subtext                  — small muted descriptor below the value
 *   ::after pseudo-element   — 3px gradient stripe at the bottom edge (accent → transparent)
 *
 * The `accent` prop drives all color decisions: label color, icon bg tint,
 * value color, and both pseudo-element stripes. This creates visual coherence
 * without per-prop color logic in the consumer.
 *
 * Used in: DashboardStats (4 KPI cards), DashboardCommand top row.
 *
 * @example
 *   <InsightCard
 *     label="High-risk reviews"
 *     value={12}
 *     subtext="3 critical"
 *     icon={AlertTriangle}
 *     accent={tokens.colors.accents.red}
 *   />
 */
import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import { LucideIcon } from 'lucide-react';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export type InsightCardProps = {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  accent: string;
};

export function InsightCard({ label, value, subtext, icon: Icon, accent }: InsightCardProps) {
  return (
    <MuiCard
      sx={{
        position: 'relative',
        p: '20px',
        overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', inset: '0 0 auto',
          height: '2px', background: accent,
        },
        '&::after': {
          content: '""', position: 'absolute', inset: 'auto 0 0',
          height: '3px', background: `linear-gradient(90deg, ${accent}88, transparent)`,
        },
      }}
    >
      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <span style={{ color: accent, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {Icon && (
          <Box sx={{ background: `${accent}22`, borderRadius: tokens.radius.md, p: '8px', color: accent, display: 'flex' }}>
            <Icon size={20} />
          </Box>
        )}
      </Box>

      {/* Value */}
      <Box component="strong" sx={{ display: 'block', color: accent, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </Box>

      {/* Subtext */}
      {subtext && (
        <Box component="span" sx={{ display: 'block', color: t.text.muted, fontSize: '0.78rem', mt: 1 }}>
          {subtext}
        </Box>
      )}
    </MuiCard>
  );
}
