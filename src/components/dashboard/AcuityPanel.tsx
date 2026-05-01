'use client';

import styled from 'styled-components';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { usePatientStore } from '@/store/patientStore';
import { tokens } from '@/theme/tokens';

const c = tokens.colors;

const Header = styled.div`
  margin-bottom: 16px;
  & p { color: ${c.text.muted}; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
  & h3 { color: ${c.text.primary}; font-size: 0.9rem; font-weight: 600; margin-top: 2px; }
`;

const ChartWrap = styled.div`
  .recharts-cartesian-axis-tick-value { fill: ${c.text.muted}; font-size: 11px; }
  .recharts-tooltip-wrapper .recharts-default-tooltip {
    background: ${c.bg.overlay} !important;
    border: 1px solid ${c.border} !important;
    border-radius: ${tokens.radius.md} !important;
    color: ${c.text.primary} !important;
  }
`;

const labels = ['0–30', '31–50', '51–70', '71+'];

export function AcuityPanel() {
  const patients = usePatientStore((s) => s.patients ?? []);

  const data = labels.map((label) => ({ label, count: 0 }));
  patients.forEach((p) => {
    const idx = p.risk > 70 ? 3 : p.risk > 50 ? 2 : p.risk > 30 ? 1 : 0;
    data[idx].count += 1;
  });

  return (
    <div>
      <Header><p>Acuity distribution</p><h3>Risk bands</h3></Header>
      <ChartWrap>
        <ResponsiveContainer height={160}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="acuityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={c.accents.cyan} stopOpacity={0.3} />
                <stop offset="95%" stopColor={c.accents.cyan} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: c.text.muted }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} width={24} tick={{ fontSize: 11, fill: c.text.muted }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: c.bg.overlay, border: `1px solid ${c.border}`, borderRadius: '10px', fontSize: '12px' }}
              itemStyle={{ color: c.text.primary }}
              labelStyle={{ color: c.text.secondary }}
            />
            <Area dataKey="count" fill="url(#acuityGrad)" stroke={c.accents.cyan} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartWrap>
    </div>
  );
}
