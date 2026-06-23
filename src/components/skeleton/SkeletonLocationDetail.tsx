import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { screenPadding, spacing } from '../../theme/layout';
import { MS } from '../../utils/responsive';
import { SkeletonAvatarTile } from './SkeletonAvatarTile';
import { SkeletonPulse } from './SkeletonPulse';

function SkeletonLocationDetailComponent() {
  return (
    <View style={styles.screen}>
      <SkeletonPulse style={styles.headerWrap}>
        <View style={styles.headerShadow} />
        <View style={styles.headerCard}>
          <View style={styles.titleLine} />
          <View style={styles.metaLine} />
          <View style={styles.dimLine} />
        </View>
      </SkeletonPulse>

      <SkeletonPulse>
        <View style={styles.headingLine} />
      </SkeletonPulse>

      <View style={styles.grid}>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.residentRow}>
            {Array.from({ length: 3 }).map((__, colIndex) => (
              <SkeletonAvatarTile key={`tile-${rowIndex}-${colIndex}`} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

export const SkeletonLocationDetail = React.memo(SkeletonLocationDetailComponent);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrap: {
    marginHorizontal: screenPadding,
    marginTop: screenPadding,
    marginBottom: spacing.lg,
  },
  headerShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  titleLine: {
    width: '70%',
    height: MS(24),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    marginBottom: MS(6),
  },
  metaLine: {
    width: '45%',
    height: MS(14),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
  dimLine: {
    width: '35%',
    height: MS(12),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
  headingLine: {
    width: MS(100),
    height: MS(18),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    marginHorizontal: screenPadding,
    marginBottom: spacing.md,
  },
  grid: {
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.xxl,
  },
  residentRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
});
