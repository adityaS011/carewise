import styled from 'styled-components';
import { BarChart3, Clock3, TrendingUp, Users } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';
import { AnalyticsOverview } from '@/components/analytics/AnalyticsOverview';
import { InsightCard } from '@/components/ui/InsightCard';
import { tokens } from '@/theme/tokens';

const c = tokens.colors;

const PageTitle = styled.div`
  margin-bottom: 24px;
  & p { color: ${c.text.muted}; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
  & h2 { color: ${c.text.primary}; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; margin-top: 2px; }
`;

const MetricsGrid = styled.section`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 16px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: repeat(2, 1fr); gap: 10px; }
`;

const PulseGrid = styled.section`
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 24px;

  @media (max-width: 700px) { grid-template-columns: repeat(3, 1fr); gap: 10px; }
  @media (max-width: 480px) { grid-template-columns: 1fr; gap: 8px; }
`;

const PulseCard = styled.article`
  background: ${c.bg.surface};
  border: 1px solid ${c.border};
  border-radius: ${tokens.radius.lg};
  padding: 18px;

  @media (max-width: 600px) { padding: 12px; }

  & strong { color: ${c.text.primary}; display: block; font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; }
  & p      { color: ${c.text.secondary}; font-size: 0.84rem; font-weight: 600; margin-top: 6px; }
  & span   { color: ${c.text.muted}; font-size: 0.75rem; }

  @media (max-width: 600px) {
    & strong { font-size: 1.4rem; }
    & p      { font-size: 0.78rem; margin-top: 4px; }
  }
`;

const Body = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 280px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

export default function AnalyticsPage() {
  return (
    <AppShell>
      <PageTitle>
        <p>Analytics</p>
        <h2>Population health command center</h2>
      </PageTitle>

      <MetricsGrid>
        <InsightCard icon={TrendingUp} label="Readmission risk"  value="12.6%" subtext="-2.1% vs last week"       accent={c.accents.red}    />
        <InsightCard icon={Clock3}     label="Time to triage"    value="18m"   subtext="6m faster than SLA"        accent={c.accents.cyan}   />
        <InsightCard icon={Users}      label="Panel coverage"    value="94%"   subtext="3 teams at capacity"        accent={c.accents.blue}   />
        <InsightCard icon={BarChart3}  label="Data freshness"    value="99.1%" subtext="Across connected devices"   accent={c.accents.green}  />
      </MetricsGrid>

      <PulseGrid>
        <PulseCard><strong>34</strong><p>Open care gaps</p><span>Needs intervention</span></PulseCard>
        <PulseCard><strong>19</strong><p>Pending lab reviews</p><span>Awaiting clinician</span></PulseCard>
        <PulseCard><strong>7</strong><p>Device sync failures</p><span>Check integrations</span></PulseCard>
      </PulseGrid>

      <Body>
        <AnalyticsCharts />
        <AnalyticsOverview />
      </Body>
    </AppShell>
  );
}
