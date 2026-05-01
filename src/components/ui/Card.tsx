/**
 * Card & PanelCard — Surface Container Primitives
 *
 * `Card` wraps MUI `Card` + `CardContent` with our design system defaults
 * (dark surface, token border, large radius, card shadow — all via muiTheme.ts).
 * Feature components import this instead of MUI Card directly.
 *
 * Key features:
 *   accent    — optional hex color that adds a 2px top-border stripe via `::before`
 *               pseudo-element (sx). Used on insight/metric cards to signal category.
 *   noPad     — skips the default CardContent padding. Use when the child manages
 *               its own internal spacing (e.g. tables, lists with dividers).
 *   sx        — escape hatch for one-off overrides; merged on top of defaults.
 *
 * `PanelCard` extends `Card` with a structured header:
 *   eyebrow   — small ALL-CAPS label above the title (e.g. "Care queue")
 *   title     — section heading (e.g. "Operational tasks")
 * Use PanelCard for dashboard side panels and analytics sections.
 *
 * Portability: copy this file + muiTheme.ts card overrides to any MUI project.
 *
 * @example
 *   <Card accent={tokens.colors.accents.cyan}>…content…</Card>
 *   <PanelCard eyebrow="Care queue" title="Operational tasks">…</PanelCard>
 *   <Card noPad><MyTable /></Card>
 */
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ReactNode } from 'react';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export type CardProps = {
  children: ReactNode;
  accent?: string;   // optional top-border color
  noPad?: boolean;
  sx?: object;
  className?: string;
};

export function Card({ children, accent, noPad, sx, className }: CardProps) {
  return (
    <MuiCard
      className={className}
      sx={{
        position: 'relative',
        ...(accent && {
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0 0 auto',
            height: '2px',
            background: accent,
            borderRadius: '14px 14px 0 0',
          },
        }),
        ...sx,
      }}
    >
      {noPad ? children : <CardContent sx={{ p: '20px !important' }}>{children}</CardContent>}
    </MuiCard>
  );
}

export type PanelCardProps = CardProps & {
  eyebrow?: string;
  title?: string;
};

export function PanelCard({ eyebrow, title, children, ...rest }: PanelCardProps) {
  return (
    <Card {...rest}>
      {(eyebrow || title) && (
        <div style={{ marginBottom: 14 }}>
          {eyebrow && (
            <p style={{ color: t.text.muted, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              {eyebrow}
            </p>
          )}
          {title && (
            <h3 style={{ color: t.text.primary, fontSize: '0.95rem', fontWeight: 600, margin: '2px 0 0' }}>
              {title}
            </h3>
          )}
        </div>
      )}
      {children}
    </Card>
  );
}
