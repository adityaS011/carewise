/**
 * Avatar & UserAvatar — Identity Display Primitives
 *
 * Wraps MUI `Avatar` with automatic fallback behaviour: when no `src` image
 * is provided, the avatar renders the person's initials on a deterministic
 * background color derived from their name.
 *
 * Key behaviours:
 *   - `avatarInitials(name)` extracts up to 2 initials (e.g. "Sarah Chen" → "SC")
 *   - `avatarColor(name)` hashes the name to one of several accent colors so the
 *     same person always gets the same color across sessions — no random flicker
 *   - `size` controls both width/height and auto-scales font-size proportionally
 *
 * `UserAvatar` is a compound component: avatar + name + optional role in a row.
 * Used in the sidebar footer and patient detail headers.
 *
 * Portability: copy this file + `src/lib/avatar.ts` to any MUI project.
 *
 * @example
 *   <Avatar name="Sarah Chen" size={40} />
 *   <Avatar name="Dr. Kim" src="/photos/kim.jpg" />
 *   <UserAvatar name="Sarah Chen" role="RN" size={32} />
 */
import MuiAvatar from '@mui/material/Avatar';
import { avatarColor, avatarInitials } from '@/lib/avatar';

export type AvatarProps = {
  name: string;
  src?: string;
  size?: number;
  sx?: object;
};

export function Avatar({ name, src, size = 32, sx }: AvatarProps) {
  return (
    <MuiAvatar
      src={src}
      alt={name}
      sx={{
        background: avatarColor(name),
        height: size,
        width: size,
        fontSize: Math.max(size * 0.38, 10),
        ...sx,
      }}
    >
      {!src && avatarInitials(name)}
    </MuiAvatar>
  );
}

export type UserAvatarProps = {
  name: string;
  role?: string;
  size?: number;
};

export function UserAvatar({ name, role, size = 32 }: UserAvatarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Avatar name={name} size={size} />
      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{name}</div>
        {role && <div style={{ fontSize: '0.72rem', opacity: 0.5 }}>{role}</div>}
      </div>
    </div>
  );
}
