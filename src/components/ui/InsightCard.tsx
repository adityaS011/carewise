/**
 * InsightCard — KPI / Metric Summary Card
 *
 * Clickable when `onClick` is provided — wraps in CardActionArea for hover state.
 * Compact by default: tighter padding, smaller value font, smaller icon.
 *
 * The `accent` prop drives all color: label, icon tint, value, and both pseudo-element stripes.
 */
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
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
  onClick?: () => void;
};

export function InsightCard({ label, value, subtext, icon: Icon, accent, onClick }: InsightCardProps) {
  const content = (
    <Box
      sx={{
        p: { xs: '10px 12px', sm: '14px 16px' },
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <span style={{ color: accent, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {label}
        </span>
        {Icon && (
          <Box sx={{ background: `${accent}22`, borderRadius: tokens.radius.md, p: { xs: '4px', sm: '6px' }, color: accent, display: 'flex' }}>
            <Icon size={15} />
          </Box>
        )}
      </Box>

      {/* Value */}
      <Box component="strong" sx={{ display: 'block', color: accent, fontSize: { xs: '1.4rem', sm: '1.9rem' }, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </Box>

      {/* Subtext */}
      {subtext && (
        <Box component="span" sx={{ display: 'block', color: t.text.muted, fontSize: '0.72rem', mt: '6px' }}>
          {subtext}
        </Box>
      )}
    </Box>
  );

  return (
    <MuiCard
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: onClick ? tokens.transition : undefined,
        '&::before': {
          content: '""', position: 'absolute', inset: '0 0 auto',
          height: '2px', background: accent,
        },
        '&::after': {
          content: '""', position: 'absolute', inset: 'auto 0 0',
          height: '3px', background: `linear-gradient(90deg, ${accent}88, transparent)`,
        },
        ...(onClick && { '&:hover': { borderColor: `${accent}44` } }),
      }}
    >
      {onClick ? <CardActionArea onClick={onClick}>{content}</CardActionArea> : content}
    </MuiCard>
  );
}
