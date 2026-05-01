'use client';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Grid2X2, List } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';

export function ViewToggle() {
  const { view, setView } = usePatientStore();

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, v) => { if (v) setView(v); }}
      aria-label="Patient view"
      size="small"
      sx={{ height: 34, '& .MuiToggleButton-root': { px: 1.25, gap: '5px', fontSize: '0.78rem', textTransform: 'none' } }}
    >
      <ToggleButton value="grid" title="Grid view"><Grid2X2 size={14} /> Grid</ToggleButton>
      <ToggleButton value="list" title="List view"><List size={14} /> List</ToggleButton>
    </ToggleButtonGroup>
  );
}
