/**
 * Button & IconButton — Design System Primitives
 *
 * Wraps MUI `Button` and `MUI `IconButton` with a simplified, domain-specific
 * variant API. Centralises all button styling decisions here so feature
 * components never import from MUI directly.
 *
 * Variant mapping (our API → MUI internals):
 *   primary  → contained + color="primary"  — cyan CTA, use for the main action per screen
 *   ghost    → text                          — subtle, low-emphasis; default for toolbars
 *   outline  → outlined                      — secondary actions with visible border
 *   danger   → contained + red sx override  — destructive actions (delete, discharge)
 *
 * Size mapping (our API → MUI):
 *   sm → small   (h=30px, 0.78rem)
 *   md → medium  (h=36px, 0.85rem)  ← default
 *   lg → large   (h=42px, 0.90rem)
 *
 * The `danger` variant intentionally bypasses MUI color system and applies
 * custom sx because MUI doesn't have a "danger" semantic color out of the box.
 *
 * Portability: copy this file + `src/theme/tokens.ts` to any MUI v6 project.
 *
 * @example
 *   <Button variant="primary" size="sm" onClick={save}>Save</Button>
 *   <Button variant="danger" onClick={remove}>Delete patient</Button>
 *   <IconButton size="sm" onClick={close}><X size={16} /></IconButton>
 */
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import { tokens } from '@/theme/tokens';

export type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<MuiButtonProps, 'variant' | 'size' | 'color'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const MUI_VARIANT: Record<ButtonVariant, MuiButtonProps['variant']> = {
  primary: 'contained',
  ghost:   'text',
  outline: 'outlined',
  danger:  'contained',
};

const MUI_SIZE: Record<ButtonSize, MuiButtonProps['size']> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

const DANGER_SX = {
  background: `rgba(239,68,68,0.12)`,
  color: tokens.colors.accents.red,
  '&:hover': { background: 'rgba(239,68,68,0.2)' },
};

export function Button({ variant = 'ghost', size = 'md', sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant={MUI_VARIANT[variant]}
      size={MUI_SIZE[size]}
      color={variant === 'danger' ? undefined : variant === 'primary' ? 'primary' : 'inherit'}
      sx={variant === 'danger' ? { ...DANGER_SX, ...sx } : sx}
      {...props}
    />
  );
}

export type IconButtonProps = Omit<MuiIconButtonProps, 'size'> & {
  size?: ButtonSize;
};

const ICON_SIZE_MAP: Record<ButtonSize, MuiIconButtonProps['size']> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

export function IconButton({ size = 'md', ...props }: IconButtonProps) {
  return <MuiIconButton size={ICON_SIZE_MAP[size]} {...props} />;
}
