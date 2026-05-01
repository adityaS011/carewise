/**
 * MetricCard — Backwards-Compat Wrapper
 *
 * Thin adapter over `InsightCard` with a slightly different prop surface
 * (`trend` instead of `subtext`, `color` instead of `accent`).
 * Kept so dashboard components that used the old API don't need updates.
 *
 * In new code: use `<InsightCard>` from `@/components/ui/InsightCard` directly.
 */
import { LucideIcon } from 'lucide-react';
import { InsightCard } from '@/components/ui/InsightCard';
import { tokens } from '@/theme/tokens';

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  color?: string;
};

export function MetricCard({ icon, label, value, trend, color }: MetricCardProps) {
  return (
    <InsightCard
      label={label}
      value={value}
      subtext={trend}
      icon={icon}
      accent={color ?? tokens.colors.brand}
    />
  );
}
