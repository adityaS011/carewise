'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiCard from '@mui/material/Card';
import { AlertTriangle, Activity, Clock3, Hospital, Plus, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InsightCard, Button, Drawer } from '@/components/ui';
import { AddPatientForm } from '@/components/patients/AddPatientForm';
import { PatientDrawer } from '@/components/patients/PatientDrawer';
import { PatientFilters } from '@/components/patients/PatientFilters';
import { PatientWorklist } from '@/components/home/PatientWorklist';
import { CapacityPanel } from '@/components/home/CapacityPanel';
import { AcuityPanel } from '@/components/home/AcuityPanel';
import { AlertsPanel } from '@/components/home/AlertsPanel';
import { NotificationButton } from '@/components/layout/NotificationButton';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;
type SideTab = 'acuity' | 'alerts' | 'capacity';
const TABS: { id: SideTab; label: string }[] = [{ id: 'acuity', label: 'Acuity' }, { id: 'alerts', label: 'Alerts' }, { id: 'capacity', label: 'Capacity' }];

export function HomeCommand() {
  const { patients = [], tasks = [], setRisk, setStatus } = usePatientStore();
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [sideTab, setSideTab] = useState<SideTab>('acuity');
  const router = useRouter();

  const highRisk  = patients.filter((p) => p.risk >= 75).length;
  const openTasks = tasks.filter((t) => t.status !== 'Done').length;
  const critical  = patients.filter((p) => p.status === 'Critical').length;

  const goPatients = (filter?: () => void) => { filter?.(); router.push('/patients'); };

  return (
    <>
      {/* Page header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '24px' }}>
        <Box>
          <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Command center</Box>
          <Box sx={{ color: t.text.primary, fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', mt: '2px' }}>Clinical operations</Box>
          <Box sx={{ color: t.text.muted, fontSize: '0.78rem', mt: '2px' }}>North region · Live mock data · Morning shift</Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button variant="outline" size="sm" onClick={() => setIntakeOpen(true)} startIcon={<Plus size={13} />}>Add patient</Button>
          <NotificationButton />
        </Box>
      </Box>

      {/* KPI cards */}
      <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
        {[
          { label: 'Total Patients', value: patients.length, subtext: 'Active panel',         icon: Hospital,      accent: t.accents.cyan,   onClick: () => goPatients() },
          { label: 'High Risk',      value: highRisk,         subtext: 'Risk score ≥ 75',      icon: AlertTriangle, accent: t.accents.red,    onClick: () => goPatients(() => setRisk('high')) },
          { label: 'Open Tasks',     value: openTasks,        subtext: 'Pending care tasks',   icon: Clock3,        accent: t.accents.orange, onClick: () => goPatients() },
          { label: 'Critical',       value: critical,          subtext: 'Immediate attention',  icon: ShieldCheck,   accent: t.accents.purple, onClick: () => goPatients(() => setStatus('Critical')) },
          { label: 'Care Teams',     value: 4,                subtext: 'Active service lines', icon: Activity,      accent: t.accents.green,  onClick: () => router.push('/analytics') },
          { label: 'Recovering',     value: patients.filter((p) => p.status === 'Recovering').length, subtext: 'Post-acute patients', accent: t.accents.blue, onClick: () => goPatients(() => setStatus('Recovering')) },
        ].map((card) => (
          <Grid size={2} key={card.label}><InsightCard {...card} /></Grid>
        ))}
      </Grid>

      {/* Worklist + side panels */}
      <Grid container spacing={2.5}>
        <Grid size={8}>
          <MuiCard sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${t.border}`, p: '18px 20px 16px' }}>
              <Box>
                <Box sx={{ color: t.text.muted, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Worklist</Box>
                <Box sx={{ color: t.text.primary, fontSize: '0.95rem', fontWeight: 600, mt: '2px' }}>Patients requiring attention</Box>
              </Box>
              <PatientFilters />
            </Box>
            <PatientWorklist />
          </MuiCard>
        </Grid>

        <Grid size={4}>
          <MuiCard sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', borderBottom: `1px solid ${t.border}` }}>
              {TABS.map(({ id, label }) => (
                <Box key={id} component="button" onClick={() => setSideTab(id)} sx={{ flex: 1, background: sideTab === id ? t.bg.elevated : 'transparent', borderBottom: `2px solid ${sideTab === id ? t.brand : 'transparent'}`, color: sideTab === id ? t.text.primary : t.text.muted, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: sideTab === id ? 600 : 400, p: '10px 8px', transition: tokens.transition, '&:hover': { color: t.text.primary } }}>
                  {label}
                </Box>
              ))}
            </Box>
            <Box sx={{ p: '16px' }}>
              {sideTab === 'acuity'   && <AcuityPanel />}
              {sideTab === 'alerts'   && <AlertsPanel />}
              {sideTab === 'capacity' && <CapacityPanel />}
            </Box>
          </MuiCard>
        </Grid>
      </Grid>

      <Drawer open={intakeOpen} onClose={() => setIntakeOpen(false)} eyebrow="Intake" title="Add a mock patient">
        <AddPatientForm onDone={() => setIntakeOpen(false)} />
      </Drawer>
      <PatientDrawer />
    </>
  );
}
