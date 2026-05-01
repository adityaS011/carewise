'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiCard from '@mui/material/Card';
import Link from 'next/link';
import { ArrowLeft, HeartPulse, ShieldCheck, Stethoscope } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { PatientStatus } from '@/types/patient';
import { ProgressBar, StatusBadge, Button } from '@/components/ui';
import { PatientWorkflow } from './PatientWorkflow';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;
const STATUSES: PatientStatus[] = ['Critical', 'Review', 'Recovering', 'Stable'];

export function PatientDetailClient({ id }: { id: string }) {
  const { getPatient, updateStatus } = usePatientStore();
  const patient = getPatient(id);

  if (!patient) return <Box sx={{ color: t.text.muted, textAlign: 'center', pt: '40px' }}>Patient not found.</Box>;

  return (
    <>
      <Box component={Link} href="/patients" sx={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: t.text.muted, fontSize: '0.82rem', mb: '20px', textDecoration: 'none', '&:hover': { color: t.text.primary } }}>
        <ArrowLeft size={15} /> Back to registry
      </Box>

      <MuiCard sx={{ mb: '20px', p: '24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '20px' }}>
          <Box>
            <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{patient.id}</Box>
            <Box sx={{ color: t.text.primary, fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', mt: '2px' }}>{patient.name}</Box>
            <Box sx={{ color: t.text.secondary, fontSize: '0.82rem' }}>{patient.age} yrs · {patient.gender} · {patient.ward}</Box>
          </Box>
          <StatusBadge status={patient.status} />
        </Box>

        <Grid container spacing={1.5} sx={{ mb: '20px' }}>
          {[
            { icon: Stethoscope, label: 'Condition', value: patient.condition },
            { icon: ShieldCheck, label: 'Risk score', value: `${patient.risk}%`, extra: <ProgressBar value={patient.risk} height={4} /> },
            { icon: HeartPulse, label: 'Vitals', value: `${patient.vitals.heartRate} bpm`, extra: <Box sx={{ color: t.text.muted, fontSize: '0.78rem', mt: '2px' }}>{patient.vitals.bloodPressure} BP · {patient.vitals.oxygen}% SpO2</Box> },
          ].map(({ icon: Icon, label, value, extra }) => (
            <Grid size={4} key={label}>
              <MuiCard sx={{ p: '14px !important' }}>
                <Icon size={18} color={t.brand} />
                <Box sx={{ color: t.text.muted, fontSize: '0.75rem', mt: '6px' }}>{label}</Box>
                <Box sx={{ color: t.text.primary, fontSize: '1rem', fontWeight: 700, mt: '2px' }}>{value}</Box>
                {extra}
              </MuiCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mb: '20px' }}>
          {STATUSES.map((s) => (
            <Button key={s} size="sm" variant={s === patient.status ? 'primary' : 'ghost'} onClick={() => updateStatus(patient.id, s)}>
              {s}
            </Button>
          ))}
        </Box>

        <MuiCard sx={{ p: '14px !important' }}>
          <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: '4px' }}>Care team</Box>
          <Box sx={{ color: t.text.primary, fontSize: '0.95rem', fontWeight: 600 }}>{patient.careTeam}</Box>
          <Box sx={{ color: t.text.muted, fontSize: '0.78rem', mt: '3px' }}>Last visit: {patient.lastVisit}</Box>
          <Box sx={{ color: t.text.secondary, fontSize: '0.83rem', fontWeight: 400, lineHeight: 1.6, mt: '10px' }}>{patient.notes}</Box>
        </MuiCard>
      </MuiCard>

      <PatientWorkflow patientId={patient.id} />
    </>
  );
}
