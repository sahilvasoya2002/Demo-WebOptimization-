import { StyleSheet, TextStyle } from 'react-native';
import { SF } from '../utils/responsive';
import { colors } from './colors';

type Weight = NonNullable<TextStyle['fontWeight']>;

export const weights = {
  regular: '400' as Weight,
  medium: '500' as Weight,
  semibold: '600' as Weight,
  bold: '700' as Weight,
};

export const sizes = {
  xxs: SF(11),
  xs: SF(12),
  sm: SF(13),
  md: SF(14),
  base: SF(15),
  lg: SF(16),
  xl: SF(18),
  xxl: SF(22),
  hero: SF(26),
};

export const typography = StyleSheet.create({
  heroTitle: {
    fontSize: sizes.hero,
    fontWeight: weights.bold,
    color: colors.text,
  },
  screenTitle: {
    fontSize: sizes.xxl,
    fontWeight: weights.bold,
    color: colors.text,
  },
  cardTitle: {
    fontSize: sizes.lg,
    fontWeight: weights.bold,
    color: colors.text,
  },
  rowTitle: {
    fontSize: sizes.base,
    fontWeight: weights.semibold,
    color: colors.text,
  },
  body: {
    fontSize: sizes.base,
    fontWeight: weights.regular,
    color: colors.text,
  },
  bodyMedium: {
    fontSize: sizes.base,
    fontWeight: weights.medium,
    color: colors.text,
  },
  caption: {
    fontSize: sizes.xs,
    fontWeight: weights.regular,
    color: colors.textMuted,
  },
  captionMedium: {
    fontSize: sizes.sm,
    fontWeight: weights.medium,
    color: colors.textMuted,
  },
  label: {
    fontSize: sizes.xs,
    fontWeight: weights.medium,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  accent: {
    fontSize: sizes.md,
    fontWeight: weights.bold,
    color: colors.accent,
  },
  link: {
    fontSize: sizes.lg,
    fontWeight: weights.medium,
    color: colors.accent,
  },
  tabLabel: {
    fontSize: sizes.xxs,
    fontWeight: weights.medium,
  },
  button: {
    fontSize: sizes.md,
    fontWeight: weights.semibold,
    color: colors.onAccent,
  },
  stateTitle: {
    fontSize: sizes.xl,
    fontWeight: weights.semibold,
    color: colors.text,
    textAlign: 'center',
  },
  stateMessage: {
    fontSize: sizes.md,
    fontWeight: weights.regular,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
