'use client';

/**
 * AnalyticsCharts — Data Visualisation Panel
 *
 * Modular component: reads from usePatientStore, renders three Recharts charts.
 * All chart colors pull from design tokens for consistent dark-theme styling.
 *
 * Charts:
 *   1. Acuity trend (AreaChart)  — static 7-day mock + gradient fill
 *   2. Team load (BarChart)       — patient count per careTeam from store
 *   3. Status mix (PieChart)      — donut by patient status from store
 */
import styled from 'styled-components';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

const c = tokens.colors;

const Grid = styled.section`
  display: grid;
  gap: 16px;
  grid-template-columns: 2fr 1fr 1fr;

  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

const ChartCard = styled.article`
  background: ${c.bg.surface};
  border: 1px solid ${c.border};
  border-radius: ${tokens.radius.lg};
  padding: 20px;

  & h3 { color: ${c.text.primary}; font-size: 0.9rem; font-weight: 600; margin-bottom: 16px; }
  & p  { color: ${c.text.muted}; font-size: 0.78rem; margin-top: 12px; }
`;

const tooltipStyle = {
  contentStyle: {
    background: c.bg.overlay,
    border: `1px solid ${c.border}`,
    borderRadius: tokens.radius.md,
    fontSize: '12px',
    color: c.text.primary,
  },
  itemStyle: { color: c.text.primary },
  labelStyle: { color: c.text.secondary },
};

const PIE_COLORS = [c.accents.green, c.accents.blue, c.accents.orange, c.accents.red];

const trend = [
  { day: 'Mon', risk: 48, tasks: 21 },
  { day: 'Tue', risk: 58, tasks: 28 },
  { day: 'Wed', risk: 54, tasks: 24 },
  { day: 'Thu', risk: 68, tasks: 35 },
  { day: 'Fri', risk: 72, tasks: 42 },
  { day: 'Sat', risk: 63, tasks: 30 },
  { day: 'Sun', risk: 76, tasks: 38 },
];

export function AnalyticsCharts() {
  const { patients = [], tasks = [] } = usePatientStore();

  const teamData = Object.entries(
    patients.reduce<Record<string, number>>((acc, p) => { acc[p.careTeam] = (acc[p.careTeam] ?? 0) + 1; return acc; }, {})
  ).map(([team, count]) => ({ team, count }));

  const statusData = Object.entries(
    patients.reduce<Record<string, number>>((acc, p) => { acc[p.status] = (acc[p.status] ?? 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <Grid>
      <ChartCard>
        <h3>Acuity trend</h3>
        <ResponsiveContainer height={220}>
          <AreaChart data={trend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={c.accents.cyan} stopOpacity={0.3} />
                <stop offset="95%" stopColor={c.accents.cyan} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
            <XAxis dataKey="day" tick={{ fill: c.text.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis width={34} tick={{ fill: c.text.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Area dataKey="risk" fill="url(#grad1)" stroke={c.accents.cyan} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <h3>Team load</h3>
        <ResponsiveContainer height={210}>
          <BarChart data={teamData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="team" hide />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="count" fill={c.accents.blue} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard>
        <h3>Status mix</h3>
        <ResponsiveContainer height={210}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92}>
              {statusData.map((item, i) => <Cell key={item.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip {...tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <p>{tasks.filter((t) => t.status !== 'Done').length} open workflow tasks</p>
      </ChartCard>
    </Grid>
  );
}
