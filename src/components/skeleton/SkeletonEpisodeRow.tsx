import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { EPISODE_ROW_HEIGHT, spacing } from '../../theme/layout';
import { MS, SW } from '../../utils/responsive';
import { SkeletonPulse } from './SkeletonPulse';

function SkeletonEpisodeRowComponent() {
  return (
    <SkeletonPulse style={styles.wrap}>
      <View style={styles.shadow} />
      <View style={styles.card}>
        <View style={styles.badge} />
        <View style={styles.meta}>
          <View style={styles.lineWide} />
          <View style={styles.lineNarrow} />
        </View>
      </View>
    </SkeletonPulse>
  );
}

export const SkeletonEpisodeRow = React.memo(SkeletonEpisodeRowComponent);

export function SkeletonSeasonBadge() {
  return (
    <SkeletonPulse style={styles.seasonBadge}>
      <View style={styles.seasonLine} />
    </SkeletonPulse>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: spacing.lg,
    marginBottom: MS(10),
  },
  shadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.md,
    minHeight: EPISODE_ROW_HEIGHT,
  },
  badge: {
    width: SW(52),
    height: MS(28),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    marginRight: spacing.md,
  },
  meta: {
    flex: 1,
    gap: spacing.xs,
  },
  lineWide: {
    height: MS(14),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '75%',
  },
  lineNarrow: {
    height: MS(12),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '35%',
  },
  seasonBadge: {
    alignSelf: 'flex-start',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.accentSoft,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  seasonLine: {
    width: MS(72),
    height: MS(14),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
});
