import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SkeletonPulse } from '../../../components/skeleton/SkeletonPulse';
import { brutal } from '../../../theme/brutal';
import { colors } from '../../../theme/colors';
import { CARD_HEIGHT, spacing } from '../../../theme/layout';
import { MS } from '../../../utils/responsive';

function SkeletonCardComponent() {
  return (
    <SkeletonPulse style={styles.skeletonWrap}>
      <View style={styles.skeletonShadow} />
      <View style={styles.skeletonCard}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonTextBlock}>
          <View style={styles.skeletonLineWide} />
          <View style={styles.skeletonLineNarrow} />
        </View>
      </View>
    </SkeletonPulse>
  );
}

export const SkeletonCard = React.memo(SkeletonCardComponent);

const avatarSize = MS(64);

const styles = StyleSheet.create({
  skeletonWrap: {
    position: 'relative',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  skeletonShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.md,
    alignItems: 'center',
    height: CARD_HEIGHT,
  },
  skeletonAvatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
  },
  skeletonTextBlock: {
    flex: 1,
    marginLeft: spacing.md,
    gap: spacing.sm,
  },
  skeletonLineWide: {
    height: MS(14),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '70%',
  },
  skeletonLineNarrow: {
    height: MS(12),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '45%',
  },
});
