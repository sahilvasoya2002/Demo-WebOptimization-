export const colors = {
  background: '#F4F6F9',
  card: '#FFFFFF',
  surface: '#FFFFFF',
  accent: '#4F46E5',
  accentSoft: '#EEF2FF',
  text: '#0F172A',
  textMuted: '#64748B',
  textSubtle: '#94A3B8',
  border: '#E2E8F0',
  inputBg: '#FFFFFF',
  alive: '#10B981',
  dead: '#EF4444',
  unknown: '#94A3B8',
  error: '#EF4444',
  favourite: '#E11D48',
  onAccent: '#FFFFFF',
  shadow: '#0F172A',
  overlay: 'rgba(15, 23, 42, 0.45)',
  black: '#000000',
} as const;

export function statusColor(status: string): string {
  switch (status) {
    case 'Alive':
      return colors.alive;
    case 'Dead':
      return colors.dead;
    default:
      return colors.unknown;
  }
}

export function formatStatusLabel(status: string): string {
  return status === 'unknown' ? 'Unknown' : status;
}
