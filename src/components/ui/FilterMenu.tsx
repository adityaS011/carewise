'use client';

/**
 * FilterMenu — Two-Level Grouped Filter Dropdown
 *
 * A single trigger button that opens a Popover with collapsible groups.
 * Replaces multiple individual Select dropdowns with one compact control.
 *
 * Structure:
 *   [Filters ▾]  ← trigger button; shows count badge when filters are active
 *     ├─ GROUP LABEL (e.g. "Team")
 *     │   ├─ Option A   ← selected option gets accent highlight
 *     │   └─ Option B
 *     └─ GROUP LABEL (e.g. "Status")
 *         └─ ...
 *
 * Atomic: no store imports. Accepts groups + values + onChange as props.
 * Portable to any MUI project.
 *
 * @example
 *   <FilterMenu
 *     groups={[
 *       { key: 'status', label: 'Status', options: [{ label: 'All', value: 'all' }, ...] },
 *       { key: 'risk',   label: 'Risk',   options: [...] },
 *     ]}
 *     values={{ status: 'Critical', risk: 'all' }}
 *     onChange={(key, value) => handlers[key](value)}
 *   />
 */
import { useState, useId } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { SlidersHorizontal, Check } from 'lucide-react';
import { Button } from './Button';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;

export type FilterOption = { label: string; value: string };

export type FilterGroup = {
  key: string;
  label: string;
  options: FilterOption[];
};

export type FilterMenuProps = {
  groups: FilterGroup[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

export function FilterMenu({ groups, values, onChange }: FilterMenuProps) {
  const id = useId();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  // Count groups where selected value is not the first option (i.e. a real filter is active)
  const activeCount = groups.filter((g) => g.options[0] && values[g.key] !== g.options[0].value).length;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => setAnchor(e.currentTarget)}
        startIcon={<SlidersHorizontal size={13} />}
        aria-controls={anchor ? id : undefined}
        aria-haspopup="true"
        sx={activeCount > 0 ? { borderColor: t.brand, color: t.brand } : undefined}
      >
        Filters
        {activeCount > 0 && (
          <Box
            component="span"
            sx={{
              ml: '6px',
              background: t.brand,
              color: '#000',
              borderRadius: '99px',
              fontSize: '0.65rem',
              fontWeight: 800,
              lineHeight: 1,
              px: '5px',
              py: '2px',
            }}
          >
            {activeCount}
          </Box>
        )}
      </Button>

      <Popover
        id={id}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: '6px',
              minWidth: 200,
              background: t.bg.elevated,
              border: `1px solid ${t.border}`,
              borderRadius: tokens.radius.lg,
              boxShadow: tokens.shadow.elevated,
              overflow: 'hidden',
            },
          },
        }}
      >
        {groups.map((group, i) => (
          <Box key={group.key}>
            {i > 0 && <Divider />}

            {/* Group label */}
            <Box sx={{ color: t.text.muted, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', px: '14px', pt: '12px', pb: '6px', textTransform: 'uppercase' }}>
              {group.label}
            </Box>

            {/* Options */}
            {group.options.map((opt) => {
              const selected = values[group.key] === opt.value;
              return (
                <Box
                  key={opt.value}
                  component="button"
                  onClick={() => { onChange(group.key, opt.value); setAnchor(null); }}
                  sx={{
                    alignItems: 'center',
                    background: selected ? `${t.brand}18` : 'transparent',
                    border: 'none',
                    color: selected ? t.brand : t.text.secondary,
                    cursor: 'pointer',
                    display: 'flex',
                    fontFamily: 'inherit',
                    fontSize: '0.82rem',
                    fontWeight: selected ? 600 : 400,
                    gap: '8px',
                    justifyContent: 'space-between',
                    px: '14px',
                    py: '8px',
                    textAlign: 'left',
                    transition: tokens.transition,
                    width: '100%',
                    '&:hover': { background: t.bg.overlay, color: t.text.primary },
                  }}
                >
                  {opt.label}
                  {selected && <Check size={13} />}
                </Box>
              );
            })}

            {i === groups.length - 1 && <Box sx={{ pb: '6px' }} />}
          </Box>
        ))}
      </Popover>
    </>
  );
}
