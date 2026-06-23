import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { GRID_CARD_HEIGHT, GRID_CARD_WIDTH, GRID_GAP, spacing } from '../../../theme/layout';
import { sizes, weights } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  gridCardWrap: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    marginBottom: GRID_GAP,
  },
  gridCardShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  gridCardAnim: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
  },
  gridCard: {
    flex: 1,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  imagePress: {
    ...StyleSheet.absoluteFill,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
  },
  statusIndicator: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    width: MS(18),
    height: MS(18),
    borderRadius: MS(9),
    backgroundColor: colors.card,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: MS(8),
    height: MS(8),
    borderRadius: MS(4),
  },
  infoButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: MS(26),
    height: MS(26),
    borderRadius: MS(13),
    backgroundColor: colors.card,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderTopWidth: brutal.borderWidth,
    borderTopColor: brutal.borderColor,
    paddingHorizontal: spacing.sm,
    paddingVertical: MS(5),
  },
  nameBarText: {
    fontSize: sizes.xs,
    fontWeight: weights.bold,
    color: colors.text,
    textAlign: 'center',
  },
});
