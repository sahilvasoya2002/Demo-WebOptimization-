import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { LOCATION_ROW_HEIGHT, spacing } from '../../theme/layout';
import { MS } from '../../utils/responsive';
import { SkeletonPulse } from './SkeletonPulse';

function SkeletonLocationRowComponent() {
  return (
    <SkeletonPulse style={styles.wrap}>
      <View style={styles.shadow} />
      <View style={styles.card}>
        <View style={styles.lineWide} />
        <View style={styles.lineMedium} />
        <View style={styles.lineNarrow} />
      </View>
    </SkeletonPulse>
  );
}

export const SkeletonLocationRow = React.memo(SkeletonLocationRowComponent);

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
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: MS(14),
    minHeight: LOCATION_ROW_HEIGHT - MS(10),
    gap: spacing.xs,
  },
  lineWide: {
    height: MS(16),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '65%',
  },
  lineMedium: {
    height: MS(12),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '40%',
  },
  lineNarrow: {
    height: MS(12),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    width: '30%',
  },
});
