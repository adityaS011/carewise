'use client';

/**
 * Drawer — Right-Side Slide-Over Panel
 *
 * Wraps MUI `Drawer` (anchor="right") with a structured layout: a fixed header
 * with close button and a scrollable body area. Used for detail views, intake
 * forms, and any task that would otherwise navigate away from the current page.
 *
 * Layout (flex column, full viewport height):
 *   ┌─────────────────────────────┐
 *   │ eyebrow (ALL CAPS label)    │ ✕
 *   │ title                       │
 *   │ description (optional)      │
 *   ├─────────────────────────────┤  ← MUI Divider
 *   │                             │
 *   │  children  (scrollable)     │
 *   │                             │
 *   └─────────────────────────────┘
 *
 * Accessibility:
 *   - Escape key closes the drawer (useEffect keyboard listener, cleaned up on unmount)
 *   - MUI Drawer renders a backdrop that closes on outside click (onClose prop)
 *   - Close button has a `title` attribute for tooltip/screen readers
 *
 * Responsive: full-width on xs screens (100vw), fixed `width` on sm+.
 *
 * @example
 *   <Drawer open={open} onClose={close} eyebrow="Intake" title="Add a mock patient" width={500}>
 *     <AddPatientForm onDone={close} />
 *   </Drawer>
 */
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { IconButton } from '@/components/ui/Button';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  width?: number | string;
};

export function Drawer({ open, onClose, title, eyebrow, description, children, width = 500 }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1300 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: { xs: '100vw', sm: width } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: '20px 24px', flexShrink: 0 }}>
          <Box>
            {eyebrow && (
              <p style={{ color: t.text.muted, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                {eyebrow}
              </p>
            )}
            <h2 style={{ color: t.text.primary, fontSize: '1rem', fontWeight: 700, margin: '3px 0 0' }}>{title}</h2>
            {description && (
              <span style={{ color: t.text.secondary, fontSize: '0.8rem', display: 'block', marginTop: 3 }}>{description}</span>
            )}
          </Box>
          <IconButton size="sm" onClick={onClose} title="Close"><X size={16} /></IconButton>
        </Box>

        <Divider />

        {/* Body */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: '24px' }}>
          {children}
        </Box>
      </Box>
    </MuiDrawer>
  );
}
