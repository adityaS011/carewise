'use client';

import { memo } from 'react';
import Box from '@mui/material/Box';
import { StatusBadge, Avatar, ProgressBar } from '@/components/ui';
import type { Patient } from '@/types/patient';
import {
  conditionSx, hideOnMobile, hideOnMobileFlex, nameSx, nameWrapSx,
  riskValueSx, riskWrapSx, rowSx, teamSx, vitalsSx,
} from './worklistStyles';

interface WorklistRowProps {
  patient: Patient;
  onSelect: (id: string) => void;
}

export const WorklistRow = memo(function WorklistRow({ patient: p, onSelect }: WorklistRowProps) {
  return (
    <Box component="button" onClick={() => onSelect(p.id)} sx={rowSx}>
      <Box sx={nameWrapSx}>
        <Avatar name={p.name} size={32} />
        <Box sx={{ minWidth: 0 }}>
          <Box sx={nameSx}>{p.name}</Box>
          <Box sx={conditionSx}>{p.condition}</Box>
        </Box>
      </Box>
      <Box sx={{ ...teamSx, ...hideOnMobile }}>{p.careTeam}</Box>
      <StatusBadge status={p.status} size="sm" />
      <Box sx={{ ...riskWrapSx, ...hideOnMobileFlex }}>
        <Box sx={riskValueSx}>{p.risk}%</Box>
        <ProgressBar value={p.risk} height={4} />
      </Box>
      <Box sx={{ ...vitalsSx, ...hideOnMobile }}>{p.vitals.heartRate} bpm · {p.vitals.oxygen}%</Box>
    </Box>
  );
});
