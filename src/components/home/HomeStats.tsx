'use client';

import styled from 'styled-components';
import { Activity, AlertTriangle, HeartPulse, Users } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { InsightCard } from '@/components/ui';
import { tokens } from '@/theme/tokens';

const Grid = styled.section`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 20px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 500px) { grid-template-columns: repeat(2, 1fr); gap: 10px; }
`;

const c = tokens.colors;

export function HomeStats() {
  const { patients = [], tasks = [] } = usePatientStore();
  const highRisk  = patients.filter((p) => p.risk >= 75).length;
  const openTasks = tasks.filter((t) => t.status !== 'Done').length;
  const avgRisk   = patients.length
    ? Math.round(patients.reduce((s, p) => s + p.risk, 0) / patients.length)
    : 0;
  const critical  = patients.filter((p) => p.status === 'Critical').length;

  return (
    <Grid>
      <InsightCard icon={Users}         label="Active patients"   value={patients.length} subtext="Live mock registry"     accent={c.accents.blue}   />
      <InsightCard icon={AlertTriangle} label="High-risk reviews" value={highRisk}         subtext={`${critical} critical`} accent={c.accents.red}    />
      <InsightCard icon={HeartPulse}    label="Average risk"      value={`${avgRisk}%`}   subtext="Across filtered panel"  accent={c.accents.orange} />
      <InsightCard icon={Activity}      label="Open care tasks"   value={openTasks}        subtext="Actionable workflows"   accent={c.accents.cyan}   />
    </Grid>
  );
}
