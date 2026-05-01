/**
 * SectionHeader — Page-Level Section Title
 *
 * Renders a two-line heading block (small eyebrow label + large bold title)
 * with an optional right-side slot for actions (filters, buttons, etc.).
 *
 * Visual hierarchy:
 *   PATIENT REGISTRY         ← eyebrow: muted, 0.72rem, uppercase, spaced
 *   All patients             ← title: primary, 1.2rem, bold, tight tracking
 *
 * The right-side `children` slot is flex-aligned to the top of the title block,
 * enabling toolbars like filter dropdowns or "Add" buttons without extra wrapper divs.
 *
 * Used in: PatientsCommand, patient detail pages, analytics pages.
 *
 * @example
 *   <SectionHeader eyebrow="Patient registry" title="All patients">
 *     <Button variant="primary" size="sm">Add patient</Button>
 *   </SectionHeader>
 */
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { tokens } from '@/theme/tokens';

export type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '20px' }}>
      <Box>
        <Box sx={{ color: tokens.colors.text.muted, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{eyebrow}</Box>
        <Box sx={{ color: tokens.colors.text.primary, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', mt: '2px' }}>{title}</Box>
      </Box>
      {children}
    </Box>
  );
}
