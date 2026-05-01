/**
 * Input & SearchInput — Text Input Primitives
 *
 * `Input` wraps MUI `OutlinedInput` with simplified icon slot props and
 * design system height/font defaults applied via `sx`. All theme-level
 * styling (border color, focus color, padding) is handled in muiTheme.ts.
 *
 * Why OutlinedInput over TextField?
 * TextField is a compound component (label + helper text + input). We use
 * OutlinedInput directly because our forms manage labels and errors externally,
 * keeping each Input instance lean and composable.
 *
 * Props beyond standard OutlinedInput:
 *   startIcon  — ReactNode placed in a left InputAdornment (e.g. <Search size={16} />)
 *   endIcon    — ReactNode placed in a right InputAdornment (e.g. <Eye size={16} />)
 *
 * `SearchInput` is a thin variant that:
 *   - accepts an `icon` prop (maps to startIcon) so callers don't need to know
 *     about InputAdornment
 *   - defaults to a narrower width (180px) suitable for filter toolbars
 *
 * @example
 *   <Input fullWidth type="email" startIcon={<Mail size={16} />} placeholder="Email" />
 *   <SearchInput icon={<Search size={14} />} value={query} onChange={…} />
 */
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactNode } from 'react';

export type InputProps = OutlinedInputProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function Input({ startIcon, endIcon, sx, ...props }: InputProps) {
  return (
    <OutlinedInput
      startAdornment={startIcon ? <InputAdornment position="start">{startIcon}</InputAdornment> : undefined}
      endAdornment={endIcon   ? <InputAdornment position="end">{endIcon}</InputAdornment>   : undefined}
      sx={{ height: 36, fontSize: '0.84rem', ...sx }}
      {...props}
    />
  );
}

/** Thin search variant — shorter width, search icon built-in */
export type SearchInputProps = Omit<InputProps, 'startIcon'> & {
  icon?: ReactNode;
};

export function SearchInput({ icon, sx, ...props }: SearchInputProps) {
  return (
    <Input
      startIcon={icon}
      sx={{ width: 180, ...sx }}
      {...props}
    />
  );
}
