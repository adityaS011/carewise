'use client';

import Box from '@mui/material/Box';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddPatientForm } from './AddPatientForm';
import { PatientDirectory } from './PatientDirectory';
import { PatientFilters } from './PatientFilters';
import { Button, Drawer } from '@/components/ui';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export function PatientsCommand() {
  const [intakeOpen, setIntakeOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', mb: '4px' }}>
        <Box>
          <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Patient registry</Box>
          <Box sx={{ color: t.text.primary, fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', mt: '2px' }}>All patients</Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <PatientFilters />
          <Button variant="primary" size="sm" onClick={() => setIntakeOpen(true)} startIcon={<Plus size={13} />}>Add patient</Button>
        </Box>
      </Box>

      <PatientDirectory />

      <Drawer open={intakeOpen} onClose={() => setIntakeOpen(false)} eyebrow="Intake" title="Add a mock patient">
        <AddPatientForm onDone={() => setIntakeOpen(false)} />
      </Drawer>
    </>
  );
}
