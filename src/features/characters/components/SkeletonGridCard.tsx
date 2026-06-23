import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SkeletonPulse } from '../../../components/skeleton/SkeletonPulse';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { GRID_CARD_HEIGHT, GRID_CARD_WIDTH, spacing } from '../../../theme/layout';
import { MS } from '../../../utils/responsive';

function SkeletonGridCardComponent() {
  return (
    <SkeletonPulse style={styles.wrap}>
      <View style={styles.shadow} />
      <View style={styles.card}>
        <View style={styles.image} />
        <View style={styles.badge} />
      </View>
    </SkeletonPulse>
  );
}

export const SkeletonGridCard = React.memo(SkeletonGridCardComponent);

const styles = StyleSheet.create({
  wrap: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    marginBottom: spacing.md,
  },
  shadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  card: {
    width: GRID_CARD_WIDTH,
    height: GRID_CARD_HEIGHT,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    backgroundColor: colors.border,
  },
  badge: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: MS(24),
    backgroundColor: colors.border,
  },
});
