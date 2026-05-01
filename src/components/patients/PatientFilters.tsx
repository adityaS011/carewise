'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Search, X } from 'lucide-react';
import { usePatientStore } from '@/store/patientStore';
import { SearchInput, CascadeMenu } from '@/components/ui';
import { ViewToggle } from './ViewToggle';
import { tokens } from '@/theme/tokens';

export function PatientFilters() {
  const { patients = [], query, risk, status, team, setQuery, setRisk, setStatus, setTeam, clearFilters } = usePatientStore();

  const teamOptions = Array.from(new Set(patients.map((p) => p.careTeam))).map((t) => ({
    label: t, value: `team:${t}`,
  }));

  // Leaf values that are currently active (non-default selections)
  const selectedValues = [
    team   !== 'all' ? `team:${team}`     : null,
    status !== 'all' ? `status:${status}` : null,
    risk   !== 'all' ? `risk:${risk}`     : null,
  ].filter(Boolean) as string[];

  const hasActiveFilters = query !== '' || selectedValues.length > 0;

  const handleSelect = ({ value }: { value?: string }) => {
    if (!value) return;
    const [key, val] = value.split(':') as [string, string];
    if (key === 'team')   setTeam(val);
    if (key === 'status') setStatus(val as typeof status);
    if (key === 'risk')   setRisk(val as typeof risk);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
      <SearchInput
        icon={<Search size={14} />}
        value={query}
        onChange={(e) => setQuery(e.target.value as string)}
        placeholder="Search patients…"
        sx={{ width: 170 }}
      />

      <CascadeMenu
        label="Filters"
        selectedValues={selectedValues}
        onSelect={handleSelect}
        items={[
          {
            label: 'Team',
            children: [
              { label: 'All teams', value: 'team:all' },
              ...teamOptions,
            ],
          },
          {
            label: 'Status',
            children: [
              { label: 'All status',  value: 'status:all'       },
              { label: 'Critical',    value: 'status:Critical'   },
              { label: 'Review',      value: 'status:Review'     },
              { label: 'Recovering',  value: 'status:Recovering' },
              { label: 'Stable',      value: 'status:Stable'     },
            ],
          },
          {
            label: 'Risk',
            children: [
              { label: 'All risk',    value: 'risk:all'    },
              { label: 'High risk',   value: 'risk:high'   },
              { label: 'Medium risk', value: 'risk:medium' },
              { label: 'Low risk',    value: 'risk:low'    },
            ],
          },
        ]}
      />

      {hasActiveFilters && (
        <Tooltip title="Clear all filters">
          <IconButton
            size="small"
            onClick={clearFilters}
            sx={{
              color: tokens.colors.text.muted,
              border: `1px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              p: '4px',
              '&:hover': { color: tokens.colors.text.primary, borderColor: tokens.colors.text.muted },
            }}
          >
            <X size={14} />
          </IconButton>
        </Tooltip>
      )}

      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <ViewToggle />
      </Box>
    </Stack>
  );
}
