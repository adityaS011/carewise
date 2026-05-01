'use client';

/**
 * CascadeMenu — Hierarchical Flyout Dropdown
 *
 * A trigger button that opens a multi-level cascading menu.
 * Hovering an item that has children slides a submenu panel out to the right.
 * Supports unlimited nesting depth.
 *
 * Visual anatomy:
 *   [Trigger ▾]
 *     ┌─────────────────┐
 *     │  Item A         │
 *     │  Item B      ›  │──► ┌──────────────┐
 *     │  Item C         │    │  Sub-item 1  │──► ┌─────────────┐
 *     └─────────────────┘    │  Sub-item 2  │    │  Leaf A     │
 *                            └──────────────┘    └─────────────┘
 *
 * Items with `children` show a › chevron and open a flyout on hover.
 * Leaf items (no children) are clickable and call `onSelect`.
 * Selected leaf values are highlighted with a cyan tint + checkmark.
 *
 * Atomic: no store imports. Fully data-driven via props.
 * Portable to any MUI project.
 *
 * @example
 *   <CascadeMenu
 *     label="Filters"
 *     selectedValues={['status:Critical']}
 *     onSelect={(item) => applyFilter(item.value)}
 *     items={[
 *       { label: 'Status', children: [
 *           { label: 'Critical', value: 'status:Critical' },
 *           { label: 'Stable',   value: 'status:Stable'   },
 *       ]},
 *       { label: 'Risk', children: [
 *           { label: 'High', value: 'risk:high' },
 *       ]},
 *     ]}
 *   />
 */
import { useState, useId, ReactNode } from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { ChevronRight, Check } from 'lucide-react';
import { Button } from './Button';
import { tokens } from '@/theme/tokens';

const t = tokens.colors;
const ITEM_H = 36; // px — height of each menu row, used for submenu alignment

export type CascadeItem = {
  label: string;
  value?: string;          // present on leaf nodes only
  icon?: ReactNode;
  children?: CascadeItem[];
};

export type CascadeMenuProps = {
  items: CascadeItem[];
  onSelect: (item: CascadeItem) => void;
  label?: string;
  selectedValues?: string[];  // leaf values that should appear selected
};

// ─── Shared panel styles ────────────────────────────────────────────────────
const PANEL_SX = {
  background: t.bg.elevated,
  border: `1px solid ${t.border}`,
  borderRadius: tokens.radius.lg,
  boxShadow: tokens.shadow.elevated,
  minWidth: 180,
  py: '4px',
} as const;

// ─── Recursive panel ────────────────────────────────────────────────────────
type PanelProps = {
  items: CascadeItem[];
  depth: number;
  openPath: number[];           // index of open item at each depth level
  setOpenPath: (p: number[]) => void;
  onSelect: (item: CascadeItem) => void;
  selectedValues?: string[];
};

function MenuPanel({ items, depth, openPath, setOpenPath, onSelect, selectedValues }: PanelProps) {
  const activeIndex = openPath[depth];
  const activeItem  = activeIndex !== undefined ? items[activeIndex] : null;

  return (
    // position:relative so the submenu can be absolutely positioned from here
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Box sx={PANEL_SX}>
        {items.map((item, i) => {
          const isOpen     = openPath[depth] === i;
          const isSelected = !!item.value && selectedValues?.includes(item.value);
          const isParent   = !!item.children?.length;

          return (
            <Box
              key={i}
              component="button"
              onMouseEnter={() => setOpenPath([...openPath.slice(0, depth), i])}
              onClick={() => { if (!isParent) onSelect(item); }}
              sx={{
                alignItems: 'center',
                background: isOpen     ? t.bg.overlay       :
                            isSelected ? `${t.brand}18`     : 'transparent',
                border: 'none',
                color: isSelected ? t.brand :
                       isOpen     ? t.text.primary : t.text.secondary,
                cursor: isParent ? 'default' : 'pointer',
                display: 'flex',
                fontFamily: 'inherit',
                fontSize: '0.82rem',
                fontWeight: isSelected ? 600 : 400,
                gap: '8px',
                height: ITEM_H,
                justifyContent: 'space-between',
                px: '14px',
                transition: tokens.transition,
                width: '100%',
                '&:hover': { background: t.bg.overlay, color: t.text.primary },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.icon}
                {item.label}
              </Box>
              {isParent   && <ChevronRight size={13} style={{ flexShrink: 0, opacity: 0.5 }} />}
              {isSelected && !isParent && <Check size={13} style={{ flexShrink: 0 }} />}
            </Box>
          );
        })}
      </Box>

      {/* Submenu — slides out to the right, top-aligned with the hovered item */}
      {activeItem?.children && (
        <Box
          sx={{
            position: 'absolute',
            left: 'calc(100% + 4px)',
            top: `${activeIndex * ITEM_H}px`,
          }}
        >
          <MenuPanel
            items={activeItem.children}
            depth={depth + 1}
            openPath={openPath}
            setOpenPath={setOpenPath}
            onSelect={onSelect}
            selectedValues={selectedValues}
          />
        </Box>
      )}
    </Box>
  );
}

// ─── Collect labels of all selected leaf items by walking the tree ───────────
function collectSelectedLabels(items: CascadeItem[], selected: string[]): string[] {
  const labels: string[] = [];
  for (const item of items) {
    if (item.children) {
      labels.push(...collectSelectedLabels(item.children, selected));
    } else if (item.value && selected.includes(item.value)) {
      labels.push(item.label);
    }
  }
  return labels;
}

// ─── Public component ────────────────────────────────────────────────────────
export function CascadeMenu({ items, onSelect, label = 'Select', selectedValues }: CascadeMenuProps) {
  const id = useId();
  const [anchor,   setAnchor]   = useState<HTMLButtonElement | null>(null);
  const [openPath, setOpenPath] = useState<number[]>([]);

  const activeLabels = selectedValues?.length
    ? collectSelectedLabels(items, selectedValues)
    : [];
  const isActive = activeLabels.length > 0;

  const handleClose = () => { setAnchor(null); setOpenPath([]); };

  const handleSelect = (item: CascadeItem) => { onSelect(item); handleClose(); };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-controls={anchor ? id : undefined}
        aria-haspopup="true"
        sx={isActive ? { borderColor: t.brand, color: t.brand } : undefined}
      >
        {isActive ? activeLabels.join(' · ') : label}
      </Button>

      {/* overflow:visible on the Paper so nested submenus can escape the bounds */}
      <Popover
        id={id}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: '6px',
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              overflow: 'visible',
            },
          },
        }}
      >
        <MenuPanel
          items={items}
          depth={0}
          openPath={openPath}
          setOpenPath={setOpenPath}
          onSelect={handleSelect}
          selectedValues={selectedValues}
        />
      </Popover>
    </>
  );
}
