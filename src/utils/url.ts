export function extractIdFromApiUrl(url: string): number {
  const segments = url.replace(/\/$/, '').split('/');
  return Number(segments[segments.length - 1]);
}

export function getNextPageFromUrl(nextUrl: string | null): number | undefined {
  if (!nextUrl) {
    return undefined;
  }
  const match = nextUrl.match(/[?&]page=(\d+)/);
  return match ? Number(match[1]) : undefined;
}

export function seasonFromEpisodeCode(code: string): string {
  return code.slice(0, 3);
}

export interface SeasonTheme {
  bg: string;
  color: string;
}

const SEASON_PALETTES: SeasonTheme[] = [
  { bg: '#D1FAE5', color: '#065F46' }, // Mint
  { bg: '#E0F2FE', color: '#075985' }, // Light Blue
  { bg: '#FCE7F3', color: '#9D174D' }, // Pink
  { bg: '#FEF9C3', color: '#854D0E' }, // Yellow
  { bg: '#F3E8FF', color: '#6B21A8' }, // Purple
  { bg: '#FFEDD5', color: '#9A3412' }, // Orange
  { bg: '#FFE4E6', color: '#9F1239' }, // Rose
  { bg: '#CCFBF1', color: '#0F766E' }, // Teal
  { bg: '#E2E8F0', color: '#334155' }, // Slate
];

export function getSeasonTheme(seasonCode: string): SeasonTheme {
  const clean = seasonCode.replace('S', '');
  const seasonNum = parseInt(clean, 10) || 0;
  return SEASON_PALETTES[seasonNum % SEASON_PALETTES.length];
}

export interface LocationTypeConfig {
  icon: 'earth-outline' | 'rocket-outline' | 'flask-outline' | 'tv-outline' | 'umbrella-outline' | 'apps-outline' | 'location-outline';
  bg: string;
  color: string;
}

export function getLocationTypeConfig(type: string): LocationTypeConfig {
  const t = type.toLowerCase();
  if (t.includes('planet')) {
    return { icon: 'earth-outline', bg: '#D1FAE5', color: '#065F46' }; // Green
  }
  if (t.includes('station')) {
    return { icon: 'rocket-outline', bg: '#FEF9C3', color: '#854D0E' }; // Yellow
  }
  if (t.includes('microverse')) {
    return { icon: 'flask-outline', bg: '#FCE7F3', color: '#9D174D' }; // Pink
  }
  if (t.includes('tv')) {
    return { icon: 'tv-outline', bg: '#EEF2FF', color: '#3730A3' }; // Indigo
  }
  if (t.includes('resort')) {
    return { icon: 'umbrella-outline', bg: '#E0F2FE', color: '#075985' }; // Light Blue
  }
  if (t.includes('cluster')) {
    return { icon: 'apps-outline', bg: '#FFEDD5', color: '#9A3412' }; // Orange
  }
  return { icon: 'location-outline', bg: '#F3F4F6', color: '#374151' }; // Gray
}
