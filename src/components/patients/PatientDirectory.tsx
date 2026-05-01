'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PatientCard } from './PatientCard';
import { PatientListRow, PatientListHeader } from './PatientListRow';
import { PatientDrawer } from './PatientDrawer';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

export function PatientDirectory() {
  const { patients = [], query, risk, status, team, view } = usePatientStore();
  const isMobile = useMediaQuery('(max-width:600px)');
  const effectiveView = isMobile ? 'grid' : view;
  const normalized = query.toLowerCase();

  const filtered = patients.filter((p) => {
    const text = [p.name, p.condition, p.careTeam, p.status].join(' ').toLowerCase();
    const riskOk = risk === 'all' ? true : risk === 'high' ? p.risk >= 75 : risk === 'medium' ? p.risk >= 45 && p.risk < 75 : p.risk < 45;
    return text.includes(normalized) && (team === 'all' || p.careTeam === team) && (status === 'all' || p.status === status) && riskOk;
  });

  if (!filtered.length) return <Box sx={{ color: tokens.colors.text.muted, fontSize: '0.9rem', mt: '40px', textAlign: 'center' }}>No patients match this search.</Box>;

  return (
    <>
      {effectiveView === 'grid' ? (
        <Grid container spacing={1.75} sx={{ mt: '20px' }}>
          {filtered.map((p) => <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}><PatientCard patient={p} /></Grid>)}
        </Grid>
      ) : (
        <Stack spacing={0} sx={{ mt: '20px' }}>
          <PatientListHeader />
          <Stack spacing={1}>
            {filtered.map((p) => <PatientListRow patient={p} key={p.id} />)}
          </Stack>
        </Stack>
      )}
      <PatientDrawer />
    </>
  );
}
