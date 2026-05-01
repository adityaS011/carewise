'use client';

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { usePatientStore } from '@/store/patientStore';
import { PatientCard } from '@/components/patients/PatientCard';
import { WorklistRow } from './WorklistRow';
import {
  emptySx, headerCellSx, headerRowSx, hideOnMobile, hideOnMobileFlex,
} from './worklistStyles';
import type { Patient } from '@/types/patient';

type Filters = { query: string; team: string; status: string; risk: string };

function filterRows(patients: Patient[], { query, team, status, risk }: Filters) {
  const text = query.toLowerCase();
  return patients
    .filter((p) => [p.name, p.condition, p.careTeam].join(' ').toLowerCase().includes(text))
    .filter((p) => team   === 'all' || p.careTeam === team)
    .filter((p) => status === 'all' || p.status   === status)
    .filter((p) => {
      if (risk === 'all')    return true;
      if (risk === 'high')   return p.risk >= 75;
      if (risk === 'medium') return p.risk >= 45 && p.risk < 75;
      return p.risk < 45;
    })
    .sort((a, b) => b.risk - a.risk);
}

const HEADERS: Array<readonly [string, object?]> = [
  ['Patient'],
  ['Team', hideOnMobile],
  ['Status'],
  ['Risk', hideOnMobileFlex],
  ['Vitals', hideOnMobile],
];

export function PatientWorklist() {
  const { patients = [], query, risk, status, team, view, selectPatient } = usePatientStore();

  const rows = useMemo(
    () => filterRows(patients, { query, team, status, risk }),
    [patients, query, team, status, risk],
  );

  if (rows.length === 0) {
    return <Box sx={emptySx}>No patients match the current filters.</Box>;
  }

  if (view === 'grid') {
    return (
      <Grid container spacing={1.75} sx={{ p: '16px 20px' }}>
        {rows.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
            <PatientCard patient={p} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box sx={headerRowSx}>
        {HEADERS.map(([label, hide]) => (
          <Box key={label} sx={{ ...headerCellSx, ...(hide ?? {}) }}>{label}</Box>
        ))}
      </Box>
      {rows.map((p) => (
        <WorklistRow key={p.id} patient={p} onSelect={selectPatient} />
      ))}
    </Box>
  );
}
