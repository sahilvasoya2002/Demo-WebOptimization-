import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import {
  avatar,
  screenPadding,
  spacing,
  RESIDENT_CARD_WIDTH,
} from '../../../theme/layout';
import { sizes, typography, weights } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  detailScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrap: {
    marginHorizontal: screenPadding,
    marginTop: screenPadding,
    marginBottom: spacing.lg,
  },
  headerCard: {
    padding: spacing.lg,
  },
  locationTitle: {
    ...typography.heroTitle,
    fontSize: sizes.xxl,
    marginBottom: MS(6),
  },
  locationMeta: {
    ...typography.link,
    fontSize: sizes.base,
    marginBottom: spacing.xs,
  },
  locationDimension: typography.caption,
  residentsHeading: {
    ...typography.rowTitle,
    fontSize: sizes.xl,
    marginHorizontal: screenPadding,
    marginBottom: spacing.md,
  },
  residentGrid: {
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.xxl,
  },
  residentRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  residentTileWrap: {
    width: RESIDENT_CARD_WIDTH,
    height: MS(126),
  },
  residentTile: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    padding: MS(10),
  },
  residentAvatar: {
    width: avatar.md,
    height: avatar.md,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  residentName: {
    fontSize: sizes.xxs,
    fontWeight: weights.regular,
    color: colors.textMuted,
    textAlign: 'center',
  },
  emptyResidents: {
    ...typography.stateMessage,
    marginTop: spacing.xxl,
  },
});
