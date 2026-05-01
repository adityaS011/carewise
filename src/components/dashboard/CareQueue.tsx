'use client';

/**
 * CareQueue — Operational Task List Panel
 *
 * Modular component: reads tasks + patients from usePatientStore.
 * Displays the top 5 open tasks with inline status update per row.
 * The native <select> is intentional — avoids full-page MUI dropdowns in a compact list.
 */
import styled from 'styled-components';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

const c = tokens.colors;

const Panel = styled.section`
  background: ${c.bg.surface};
  border: 1px solid ${c.border};
  border-radius: ${tokens.radius.lg};
  overflow: hidden;
`;

const Head = styled.div`
  align-items: flex-start;
  border-bottom: 1px solid ${c.border};
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;

  & p  { color: ${c.text.muted}; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
  & h2 { color: ${c.text.primary}; font-size: 0.95rem; font-weight: 600; margin-top: 2px; }
`;

const OpenBadge = styled.span`
  background: rgba(6,182,212,0.12);
  border: 1px solid rgba(6,182,212,0.2);
  border-radius: 99px;
  color: ${c.brand};
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 9px;
`;

const Item = styled.article`
  align-items: flex-start;
  border-bottom: 1px solid ${c.border};
  display: flex;
  gap: 12px;
  padding: 14px 20px;

  &:last-child { border-bottom: none; }
  & svg { color: ${c.brand}; flex-shrink: 0; margin-top: 2px; }
`;

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  & strong { color: ${c.text.primary}; display: block; font-size: 0.83rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  & a      { color: ${c.text.muted}; font-size: 0.75rem; &:hover { color: ${c.brand}; } }
`;

const StatusSelect = styled.select`
  appearance: none;
  background: ${c.bg.elevated};
  border: 1px solid ${c.border};
  border-radius: ${tokens.radius.sm};
  color: ${c.text.secondary};
  cursor: pointer;
  font-size: 0.75rem;
  flex-shrink: 0;
  padding: 4px 8px;
  &:focus { border-color: ${c.brand}; outline: none; }
`;

export function CareQueue() {
  const { tasks = [], updateTask, getPatient } = usePatientStore();
  const active = tasks.filter((t) => t.status !== 'Done').slice(0, 5);

  return (
    <Panel>
      <Head>
        <div><p>Care queue</p><h2>Operational tasks</h2></div>
        <OpenBadge>{active.length} open</OpenBadge>
      </Head>
      {active.map((task) => {
        const patient = getPatient(task.patientId);
        return (
          <Item key={task.id}>
            <CheckCircle2 size={17} />
            <ItemBody>
              <strong>{task.title}</strong>
              <Link href={`/patients/${task.patientId}`}>{patient?.name ?? task.patientId}</Link>
            </ItemBody>
            <StatusSelect value={task.status} onChange={(e) => updateTask(task.id, e.target.value as typeof task.status)}>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </StatusSelect>
          </Item>
        );
      })}
    </Panel>
  );
}
