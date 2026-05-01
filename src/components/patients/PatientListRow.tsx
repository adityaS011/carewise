import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { usePatientStore } from '@/store/patientStore';
import { Patient } from '@/types/patient';
import { tokens } from '@/theme/tokens';
import { Avatar, StatusBadge, ProgressBar } from '@/components/ui';

const t = tokens.colors;

// Shared column template — used by both the header and each data row
const COLS = '2fr 1fr 1fr 1.4fr 1fr';

export function PatientListHeader() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: COLS, gap: '12px', alignItems: 'center', px: '16px', pb: '8px' }}>
      {['Patient', 'Team', 'Status', 'Risk', 'Vitals'].map((h) => (
        <Box key={h} sx={{ color: t.text.muted, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {h}
        </Box>
      ))}
    </Box>
  );
}

export function PatientListRow({ patient }: { patient: Patient }) {
  const selectPatient = usePatientStore((s) => s.selectPatient);

  return (
    <MuiCard sx={{ mb: 0 }}>
      <CardActionArea onClick={() => selectPatient(patient.id)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: COLS, gap: '12px', alignItems: 'center', p: '10px 16px' }}>

          {/* Patient */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <Avatar name={patient.name} size={34} />
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ color: t.text.primary, fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {patient.name}
              </Box>
              <Box sx={{ color: t.text.muted, fontSize: '0.75rem', mt: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {patient.condition}
              </Box>
            </Box>
          </Box>

          {/* Team */}
          <Box sx={{ color: t.text.secondary, fontSize: '0.82rem' }}>{patient.careTeam}</Box>

          {/* Status */}
          <StatusBadge status={patient.status} size="sm" />

          {/* Risk */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Box sx={{ color: t.text.secondary, fontSize: '0.78rem', fontWeight: 600 }}>{patient.risk}%</Box>
            <ProgressBar value={patient.risk} height={4} />
          </Box>

          {/* Vitals */}
          <Box sx={{ color: t.text.muted, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
            {patient.vitals.heartRate} bpm · {patient.vitals.oxygen}%
          </Box>

        </Box>
      </CardActionArea>
    </MuiCard>
  );
}
