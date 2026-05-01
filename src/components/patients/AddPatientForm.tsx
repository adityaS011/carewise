'use client';

import Stack from '@mui/material/Stack';
import { FormEvent, useState } from 'react';
import { Plus } from 'lucide-react';
import { mockCareData } from '@/data/mockCare';
import { usePatientStore } from '@/store/patientStore';
import { Input, Select, Button } from '@/components/ui';

const teamOptions = mockCareData.teams.map((t) => ({ label: t.name, value: t.name }));

export function AddPatientForm({ onDone }: { onDone?: () => void }) {
  const addPatient = usePatientStore((s) => s.addPatient);
  const [name,      setName]      = useState('');
  const [age,       setAge]       = useState('45');
  const [condition, setCondition] = useState('');
  const [careTeam,  setCareTeam]  = useState(teamOptions[0].value);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !condition.trim()) return;
    addPatient({ name: name.trim(), age: Number(age), condition: condition.trim(), careTeam });
    setName(''); setCondition('');
    onDone?.();
  };

  return (
    <Stack component="form" spacing={2} onSubmit={onSubmit}>
      <Input
        fullWidth
        placeholder="Patient name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{ 'aria-label': 'Patient name' }}
      />
      <Input
        fullWidth
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        inputProps={{ min: 1, max: 110, 'aria-label': 'Age in years' }}
      />
      <Input
        fullWidth
        placeholder="Primary condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        inputProps={{ 'aria-label': 'Primary condition' }}
      />
      <Select
        value={careTeam}
        onChange={setCareTeam}
        options={teamOptions}
        sx={{ width: '100%' }}
      />
      <Button type="submit" variant="primary" size="md" fullWidth startIcon={<Plus size={16} />}>
        Add patient
      </Button>
    </Stack>
  );
}
