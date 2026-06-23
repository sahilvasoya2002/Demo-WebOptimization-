import { MS } from '../utils/responsive';
import { colors } from './colors';

export const brutal = {
  borderWidth: MS(2.5),
  borderColor: colors.text,
  shadowOffset: MS(4),
  radius: MS(12),
  badgeRadius: MS(8),
} as const;
