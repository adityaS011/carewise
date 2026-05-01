'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Siren } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export function AlertsPanel() {
  const { patients = [], selectPatient } = usePatientStore();
  const alerts = patients.filter((p) => p.risk >= 70 || p.status === 'Critical').slice(0, 5);

  return (
    <Box>
      <Box sx={{ mb: '14px' }}>
        <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Clinical alerts</Box>
        <Box sx={{ color: t.text.primary, fontSize: '0.9rem', fontWeight: 600, mt: '2px' }}>Needs review</Box>
      </Box>
      {alerts.length === 0
        ? <Box sx={{ color: t.text.muted, fontSize: '0.82rem' }}>No high-risk patients.</Box>
        : (
          <Stack spacing={0.75}>
            {alerts.map((p) => (
              <Box
                key={p.id}
                component="button"
                onClick={() => selectPatient(p.id)}
                sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: tokens.radius.md, cursor: 'pointer', fontFamily: 'inherit', p: '10px 12px', textAlign: 'left', transition: tokens.transition, width: '100%', '&:hover': { background: 'rgba(239,68,68,0.1)' } }}
              >
                <Siren size={14} color={t.accents.red} style={{ flexShrink: 0, marginTop: 2 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ color: t.text.primary, fontWeight: 600, fontSize: '0.82rem' }}>{p.name}</Box>
                  <Box sx={{ color: t.text.muted, fontSize: '0.72rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.notes}</Box>
                </Box>
                <Box sx={{ background: 'rgba(239,68,68,0.15)', borderRadius: '99px', color: t.accents.red, flexShrink: 0, fontSize: '0.72rem', fontWeight: 700, px: '7px', py: '2px' }}>
                  {p.risk}%
                </Box>
              </Box>
            ))}
          </Stack>
        )
      }
    </Box>
  );
}
