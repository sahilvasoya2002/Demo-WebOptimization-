import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { spacing } from '../../../theme/layout';
import { sizes, typography, weights } from '../../../theme/typography';
import { MS, SH } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  backdropTap: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    height: SH(280),
    backgroundColor: brutal.borderColor,
    borderTopLeftRadius: brutal.radius,
    borderTopRightRadius: brutal.radius,
  },
  card: {
    backgroundColor: colors.card,
    borderTopLeftRadius: brutal.radius,
    borderTopRightRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderBottomWidth: 0,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.rowTitle,
    fontSize: sizes.xl,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: sizes.sm,
    fontWeight: weights.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: MS(8),
    marginBottom: spacing.lg,
  },
  optionPill: {
    paddingHorizontal: MS(14),
    paddingVertical: MS(8),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.surface,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
  },
  optionPillActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  optionLabel: {
    fontSize: sizes.sm,
    fontWeight: weights.semibold,
    color: colors.text,
  },
  optionLabelActive: {
    color: colors.accent,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  clearButton: {
    paddingVertical: MS(12),
    paddingHorizontal: spacing.md,
  },
  clearLabel: {
    fontSize: sizes.base,
    fontWeight: weights.semibold,
    color: colors.textMuted,
  },
  applyWrap: {
    flex: 1,
    position: 'relative',
  },
  applyShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.badgeRadius,
    backgroundColor: brutal.borderColor,
  },
  applyButton: {
    backgroundColor: colors.accent,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    paddingVertical: MS(12),
    alignItems: 'center',
  },
  applyLabel: {
    ...typography.button,
  },
});
