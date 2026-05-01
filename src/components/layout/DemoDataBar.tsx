'use client';

/**
 * DemoDataBar — Mock Data Disclaimer + Reset Banner
 *
 * Modular component: reads resetDemo from usePatientStore.
 * Shown at the top of data pages to communicate mock-data context and allow reset.
 */
import Box from '@mui/material/Box';
import { RotateCcw } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

export function DemoDataBar() {
  const resetDemo = usePatientStore((s) => s.resetDemo);

  const handleReset = () => {
    if (!window.confirm('Reset all mock data to defaults?')) return;
    resetDemo();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,182,212,0.07)', border: `1px solid rgba(6,182,212,0.18)`, borderRadius: tokens.radius.md, fontSize: '0.78rem', mb: '20px', px: '14px', py: '8px' }}>
      <span style={{ color: tokens.colors.text.secondary }}>Mock data is editable and stored in this browser.</span>
      <Box component="button" onClick={handleReset} sx={{ alignItems: 'center', color: tokens.colors.brand, display: 'flex', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 600, gap: '5px', background: 'none', border: 'none', cursor: 'pointer', '&:hover': { opacity: 0.75 } }}>
        <RotateCcw size={13} /> Reset demo
      </Box>
    </Box>
  );
}
