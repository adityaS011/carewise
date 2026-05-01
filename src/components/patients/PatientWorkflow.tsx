'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { FormEvent, useState } from 'react';
import { ClipboardPlus } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { Input, Button, Select } from '@/components/ui';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

const STATUS_OPTIONS = [
  { label: 'Open',        value: 'Open'        },
  { label: 'In Progress', value: 'In Progress'  },
  { label: 'Done',        value: 'Done'         },
];

export function PatientWorkflow({ patientId }: { patientId: string }) {
  const { addTask, tasks = [], updateTask } = usePatientStore();
  const [title, setTitle] = useState('Call patient within 24 hours');
  const patientTasks = tasks.filter((t) => t.patientId === patientId);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(patientId, title.trim());
    setTitle('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px', color: t.text.secondary, fontSize: '0.82rem', fontWeight: 600, mb: '14px' }}>
        <ClipboardPlus size={16} /> Care tasks
      </Box>
      <Stack component="form" spacing={1.5} onSubmit={onSubmit} sx={{ mb: '16px' }}>
        <Input fullWidth placeholder="Describe the care task" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button type="submit" variant="outline" size="sm" fullWidth>Create task</Button>
      </Stack>
      <Stack spacing={1}>
        {patientTasks.map((task) => (
          <MuiCard key={task.id} sx={{ p: 0 }}>
            <Box sx={{ p: '12px' }}>
              <Box sx={{ color: t.text.primary, fontWeight: 600, fontSize: '0.83rem', mb: '4px' }}>{task.title}</Box>
              <Box sx={{ color: t.text.muted, fontSize: '0.73rem', mb: '8px' }}>{task.priority} · {task.owner} · {task.due}</Box>
              <Select
                value={task.status}
                onChange={(v) => updateTask(task.id, v as typeof task.status)}
                options={STATUS_OPTIONS}
                size="small"
              />
            </Box>
          </MuiCard>
        ))}
      </Stack>
    </Box>
  );
}
