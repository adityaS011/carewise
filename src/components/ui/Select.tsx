/**
 * Select — Dropdown Primitive
 *
 * Wraps MUI `Select` + `MenuItem` + `FormControl` behind a clean data-driven API.
 * Instead of rendering `<MenuItem>` children manually at each call site, consumers
 * pass an `options` array and a controlled `value`/`onChange` pair.
 *
 * Why not use native `<select>`?
 * MUI Select inherits our dark theme automatically (border, focus color, menu
 * background, font). Native selects can't be styled consistently across browsers.
 *
 * Props:
 *   value        — currently selected option value (controlled)
 *   onChange     — called with the new value string on selection
 *   options      — array of { label, value } objects rendered as MenuItems
 *   placeholder  — optional disabled first item shown when no value matches
 *   size         — 'small' (default, h≈34px) | 'medium'
 *   sx           — sx override forwarded to FormControl
 *
 * @example
 *   <Select
 *     value={status}
 *     onChange={(v) => setStatus(v as PatientStatus)}
 *     options={[
 *       { label: 'All status', value: 'all' },
 *       { label: 'Critical',   value: 'Critical' },
 *     ]}
 *   />
 */
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export type SelectOption = { label: string; value: string };

export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: 'small' | 'medium';
  sx?: object;
};

export function Select({ value, onChange, options, placeholder, size = 'small', sx }: SelectProps) {
  return (
    <FormControl size={size} sx={sx}>
      <MuiSelect
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        displayEmpty
        sx={{ height: 34, fontSize: '0.82rem', minWidth: 120 }}
      >
        {placeholder && (
          <MenuItem value="" disabled sx={{ display: 'none' }}>
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
