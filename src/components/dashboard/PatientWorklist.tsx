'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { usePatientStore } from '@/store/patientStore';
import { StatusBadge, Avatar, ProgressBar } from '@/components/ui';
import { PatientCard } from '@/components/patients/PatientCard';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;
const COLS = '2fr 1fr 1fr 1.2fr 1fr';

function filterRows(
  patients: ReturnType<typeof usePatientStore.getState>['patients'],
  { query, team, status, risk }: { query: string; team: string; status: string; risk: string },
) {
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

export function PatientWorklist() {
  const { patients = [], query, risk, status, team, view, selectPatient } = usePatientStore();
  const rows = filterRows(patients, { query, team, status, risk });

  if (rows.length === 0) return <Box sx={{ color: t.text.muted, fontSize: '0.84rem', p: '32px 20px', textAlign: 'center' }}>No patients match the current filters.</Box>;

  if (view === 'grid') {
    return (
      <Grid container spacing={1.75} sx={{ p: '16px 20px' }}>
        {rows.map((p) => <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}><PatientCard patient={p} /></Grid>)}
      </Grid>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'grid', gridTemplateColumns: COLS, borderBottom: `1px solid ${t.border}`, p: '10px 20px' }}>
        {['Patient', 'Team', 'Status', 'Risk', 'Vitals'].map((h) => (
          <Box key={h} sx={{ color: t.text.muted, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</Box>
        ))}
      </Box>
      {/* Rows */}
      {rows.map((p) => (
        <Box key={p.id} component="button" onClick={() => selectPatient(p.id)} sx={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', borderBottom: `1px solid ${t.border}`, cursor: 'pointer', fontFamily: 'inherit', p: '12px 20px', textAlign: 'left', transition: tokens.transition, width: '100%', '&:last-child': { borderBottom: 0 }, '&:hover': { background: t.bg.elevated } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <Avatar name={p.name} size={32} />
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ color: t.text.primary, fontWeight: 600, fontSize: '0.84rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</Box>
              <Box sx={{ color: t.text.muted, fontSize: '0.72rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.condition}</Box>
            </Box>
          </Box>
          <Box sx={{ color: t.text.secondary, fontSize: '0.82rem' }}>{p.careTeam}</Box>
          <StatusBadge status={p.status} size="sm" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', minWidth: 80, pr: '12px' }}>
            <Box sx={{ color: t.text.secondary, fontSize: '0.78rem', fontWeight: 700 }}>{p.risk}%</Box>
            <ProgressBar value={p.risk} height={4} />
          </Box>
          <Box sx={{ color: t.text.muted, fontSize: '0.75rem' }}>{p.vitals.heartRate} bpm · {p.vitals.oxygen}%</Box>
        </Box>
      ))}
    </Box>
  );
}
