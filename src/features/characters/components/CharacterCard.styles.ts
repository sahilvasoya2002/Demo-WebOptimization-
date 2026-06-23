import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { avatar, CARD_HEIGHT, radius, spacing } from '../../../theme/layout';
import { typography } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  listCardWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    height: CARD_HEIGHT,
  },
  listCardShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    height: CARD_HEIGHT,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  listCardAnim: {
    height: CARD_HEIGHT,
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.md,
    height: CARD_HEIGHT,
    alignItems: 'center',
  },
  avatarImage: {
    width: avatar.sm,
    height: avatar.sm,
    borderRadius: radius.sm,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
  },
  characterMeta: {
    flex: 1,
    marginLeft: spacing.md,
  },
  characterName: {
    ...typography.cardTitle,
    marginBottom: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: MS(2),
  },
  statusDot: {
    width: MS(6),
    height: MS(6),
    borderRadius: MS(3),
    marginRight: MS(4),
  },
  statusText: {
    ...typography.captionMedium,
    color: colors.text,
  },
  speciesLabel: typography.captionMedium,
  locationLabel: typography.caption,
  removeButton: {
    padding: spacing.sm,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.accentSoft,
  },
});
