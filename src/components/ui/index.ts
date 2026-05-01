/**
 * CareWise Design System — Barrel Export
 *
 * Single import point for every component in the ui/ design system layer.
 * Feature components import everything from here:
 *   import { Button, Card, StatusBadge } from '@/components/ui'
 *
 * Architecture (three tiers):
 *   1. src/theme/          — tokens + MUI theme config (no JSX)
 *   2. src/components/ui/  — this folder: thin wrappers over MUI primitives
 *   3. src/components/**   — feature components that consume the design system
 *
 * Component categories exported here:
 *
 *   Primitives (direct MUI wrappers — portable to any MUI project):
 *     Button, IconButton    — variant/size API over MUI Button
 *     Avatar, UserAvatar    — initials fallback + deterministic color
 *     StatusBadge,StatusPill— patient status chip
 *     ProgressBar           — auto-color linear progress
 *     Card, PanelCard       — surface container with optional accent stripe
 *     InsightCard           — KPI metric card with dual accent stripes
 *     Input, SearchInput    — OutlinedInput with icon slots
 *     Select                — data-driven MUI Select
 *     Drawer                — right-side slide-over panel
 *
 *   Feature UI (domain-specific, depend on patient store):
 *     DashboardStats        — 4 live KPI cards (patient/risk/task metrics)
 *     CareQueue             — top 5 open care tasks with inline status update
 *     AnalyticsCharts       — area + bar + donut Recharts visualisations
 *     AnalyticsOverview     — patient count by care team
 *     NotificationButton    — triggers push notification for highest-risk patient
 *
 *   Layout helpers:
 *     SectionHeader         — eyebrow + title row with optional right slot
 *     DemoDataBar           — mock-data disclaimer + reset banner
 *
 *   Backwards-compat aliases (prefer the canonical component in new code):
 *     Panel      → PanelCard
 *     MetricCard → InsightCard
 */

export { Button, IconButton }       from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { Avatar, UserAvatar }       from './Avatar';
export type { AvatarProps }         from './Avatar';

export { StatusBadge, StatusPill }  from './StatusBadge';
export type { StatusBadgeProps }    from './StatusBadge';

export { ProgressBar }              from './ProgressBar';
export type { ProgressBarProps }    from './ProgressBar';

export { Card, PanelCard }          from './Card';
export type { CardProps, PanelCardProps } from './Card';

export { InsightCard }              from './InsightCard';
export type { InsightCardProps }    from './InsightCard';

export { Input, SearchInput }       from './Input';
export type { InputProps }          from './Input';

export { Select }                   from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Drawer }                   from './Drawer';
export type { DrawerProps }         from './Drawer';

export { Panel }                    from './Panel';
export { MetricCard }               from './MetricCard';
export { SectionHeader }            from './SectionHeader';

export { FilterMenu }               from './FilterMenu';
export type { FilterMenuProps, FilterGroup, FilterOption } from './FilterMenu';

export { CascadeMenu }              from './CascadeMenu';
export type { CascadeMenuProps, CascadeItem } from './CascadeMenu';
