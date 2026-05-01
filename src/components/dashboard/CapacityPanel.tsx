import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { mockCareData } from '@/data/mockCare';
import { ProgressBar } from '@/components/ui';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export function CapacityPanel() {
  return (
    <Box>
      <Box sx={{ mb: '16px' }}>
        <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Team capacity</Box>
        <Box sx={{ color: t.text.primary, fontSize: '0.9rem', fontWeight: 600, mt: '2px' }}>Load by service line</Box>
      </Box>
      <Stack spacing={2}>
        {mockCareData.teams.map((team) => (
          <Box key={team.name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
              <Box>
                <Box sx={{ color: t.text.primary, fontWeight: 600, fontSize: '0.85rem' }}>{team.name}</Box>
                <Box sx={{ color: t.text.muted, fontSize: '0.72rem', mt: '2px' }}>{team.activeCases} active cases</Box>
              </Box>
            </Box>
            <ProgressBar value={team.capacity} showLabel aria-label={`${team.name} at ${team.capacity}% capacity`} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
