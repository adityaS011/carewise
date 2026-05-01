import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { usePatientStore } from '@/store/patientStore';
import { Patient } from '@/types/patient';
import { tokens } from '@/theme/tokens';
import { Avatar, StatusBadge, ProgressBar } from '@/components/ui';

const t = tokens.colors;

export function PatientCard({ patient }: { patient: Patient }) {
  const selectPatient = usePatientStore((s) => s.selectPatient);

  return (
    <MuiCard sx={{ transition: tokens.transition, '&:hover': { borderColor: t.borderHover, transform: 'translateY(-1px)', boxShadow: tokens.shadow.elevated } }}>
      <CardActionArea onClick={() => selectPatient(patient.id)}>
        <CardContent sx={{ p: '16px !important', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar name={patient.name} size={36} />
            <StatusBadge status={patient.status} size="sm" />
          </Box>

          <Box>
            <Box sx={{ color: t.text.primary, fontWeight: 600, fontSize: '0.9rem' }}>{patient.name}</Box>
            <Box sx={{ color: t.text.muted, fontSize: '0.72rem', mt: '2px' }}>{patient.id} · {patient.age} yrs · {patient.gender}</Box>
          </Box>

          <Box sx={{ color: t.text.secondary, fontSize: '0.8rem', fontWeight: 500 }}>{patient.condition}</Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ color: t.text.muted, fontSize: '0.72rem' }}>{patient.careTeam}</Box>
            <Box sx={{ color: t.text.muted, fontSize: '0.72rem' }}>{patient.lastVisit}</Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Box sx={{ color: t.text.secondary, fontSize: '0.78rem', fontWeight: 600 }}>{patient.risk}% risk</Box>
            <ProgressBar value={patient.risk} height={4} />
          </Box>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
}
