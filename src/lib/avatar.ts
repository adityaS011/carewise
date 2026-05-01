const PALETTE = [
  "#0d9488", "#3b82f6", "#8b5cf6", "#f59e0b",
  "#ef4444", "#10b981", "#ec4899", "#0ea5e9",
];

export function avatarInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}
