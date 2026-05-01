'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { Drawer, ProgressBar, StatusBadge, Button } from '@/components/ui';
import { PatientWorkflow } from './PatientWorkflow';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export function PatientDrawer() {
  const { closePatient, getPatient, selectedPatientId, updateStatus } = usePatientStore();
  const { notifyPatient } = useServiceWorker();
  const patient = selectedPatientId ? getPatient(selectedPatientId) : undefined;

  const handleEscalate = () => {
    if (!patient) return;
    updateStatus(patient.id, 'Critical');
    notifyPatient(patient.name, `Escalated to Critical — Risk ${patient.risk}%. Immediate review required.`, patient.id);
  };

  return (
    <Drawer open={Boolean(patient)} onClose={closePatient} eyebrow={patient?.id} title={patient?.name ?? 'Patient details'} description={patient?.condition}>
      {patient && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: '12px' }}>
            <StatusBadge status={patient.status} />
            <Box sx={{ color: t.text.secondary, fontSize: '0.85rem' }}>{patient.risk}% risk</Box>
          </Box>

          <ProgressBar value={patient.risk} />

          {/* Facts strip */}
          <Box sx={{ display: 'flex', border: `1px solid ${t.border}`, borderRadius: tokens.radius.md, overflow: 'hidden', my: '16px' }}>
            {[`${patient.age} yrs`, patient.careTeam, patient.ward].map((fact) => (
              <Box key={fact} sx={{ flex: 1, textAlign: 'center', py: '10px', px: '12px', color: t.text.secondary, fontSize: '0.8rem', borderRight: `1px solid ${t.border}`, '&:last-child': { borderRight: 'none' } }}>
                {fact}
              </Box>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', mb: '20px' }}>
            <Button variant="danger" size="sm" onClick={handleEscalate}>Escalate</Button>
            <Button variant="ghost" size="sm" onClick={() => updateStatus(patient.id, 'Stable')}>Mark stable</Button>
            <Box component={Link} href={`/patients/${patient.id}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: t.brand, fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
              <ExternalLink size={14} /> Full chart
            </Box>
          </Box>

          {/* Clinical note */}
          <Box sx={{ background: t.bg.surface, border: `1px solid ${t.border}`, borderRadius: tokens.radius.md, p: '14px', mb: '20px' }}>
            <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', mb: '6px' }}>Clinical note</Box>
            <Box sx={{ color: t.text.primary, fontSize: '0.85rem', fontWeight: 400, lineHeight: 1.6 }}>{patient.notes}</Box>
          </Box>

          <Divider sx={{ mb: '20px' }} />
          <PatientWorkflow patientId={patient.id} />
        </>
      )}
    </Drawer>
  );
}
