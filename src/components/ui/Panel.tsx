/**
 * Panel — Backwards-Compat Wrapper
 *
 * Thin alias over `PanelCard`. Existed before the design system was unified
 * around Card/PanelCard. Kept so older feature components don't need updating.
 *
 * In new code: use `<PanelCard>` from `@/components/ui/Card` directly.
 */
import { ReactNode } from 'react';
import { PanelCard } from '@/components/ui/Card';

type PanelProps = {
  eyebrow?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

export function Panel({ eyebrow, title, children, className }: PanelProps) {
  return (
    <PanelCard eyebrow={eyebrow} title={title} className={className}>
      {children}
    </PanelCard>
  );
}
