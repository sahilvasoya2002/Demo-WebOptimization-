import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { avatar, screenPadding, spacing } from '../../../theme/layout';
import { typography } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';

export const heroSize = avatar.lg;

export const styles = StyleSheet.create({
  detailScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailContent: {
    padding: screenPadding,
    paddingBottom: spacing.xxl,
  },
  heroCardWrap: {
    marginBottom: spacing.lg,
  },
  heroCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroImageRing: {
    padding: MS(4),
    borderRadius: heroSize / 2 + MS(4),
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    marginBottom: spacing.md,
  },
  heroImage: {
    width: heroSize,
    height: heroSize,
    borderRadius: heroSize / 2,
    backgroundColor: colors.border,
  },
  favouriteWrap: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  characterTitle: {
    ...typography.heroTitle,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: brutal.badgeRadius,
  },
  statusBadge: {
    width: MS(8),
    height: MS(8),
    borderRadius: brutal.badgeRadius,
    marginRight: spacing.sm,
  },
  metaText: typography.bodyMedium,
  sectionWrap: {
    marginBottom: spacing.lg,
  },
  infoCard: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  fieldRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: brutal.borderWidth,
    borderBottomColor: colors.border,
  },
  fieldRowLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  fieldValue: typography.body,
  linkValue: typography.link,
  episodesCard: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.rowTitle,
    marginBottom: spacing.sm,
  },
});
