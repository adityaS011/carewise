'use client';

/**
 * AnalyticsOverview — Patient Distribution Summary
 *
 * Modular component: reads from usePatientStore.
 * Tabular breakdown of patient count per care team (service line).
 * Companion sidebar to AnalyticsCharts on the analytics page.
 */
import styled from 'styled-components';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

const c = tokens.colors;

const Section = styled.section`
  background: ${c.bg.surface};
  border: 1px solid ${c.border};
  border-radius: ${tokens.radius.lg};
  padding: 20px;
  margin-bottom: 16px;
`;

const Header = styled.div`
  margin-bottom: 16px;
  & p { color: ${c.text.muted}; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
  & h3 { color: ${c.text.primary}; font-size: 0.95rem; font-weight: 600; margin-top: 2px; }
`;

const Row = styled.article`
  align-items: center;
  border-bottom: 1px solid ${c.border};
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  &:last-of-type { border-bottom: none; }
  & span { color: ${c.text.secondary}; font-size: 0.84rem; }
  & strong { color: ${c.brand}; font-size: 0.84rem; font-weight: 700; }
`;

const Note = styled.p`
  color: ${c.text.muted};
  font-size: 0.78rem;
  margin-top: 14px;
`;

export function AnalyticsOverview() {
  const { patients = [], tasks = [] } = usePatientStore();

  const byTeam = Object.entries(
    patients.reduce<Record<string, number>>((acc, p) => {
      acc[p.careTeam] = (acc[p.careTeam] ?? 0) + 1;
      return acc;
    }, {})
  );

  return (
    <Section>
      <Header>
        <p>Patient distribution</p>
        <h3>Cohort by service line</h3>
      </Header>
      {byTeam.map(([team, count]) => (
        <Row key={team}>
          <span>{team}</span>
          <strong>{count} {count === 1 ? 'patient' : 'patients'}</strong>
        </Row>
      ))}
      <Note>{tasks.length} care tasks in the workflow queue.</Note>
    </Section>
  );
}
