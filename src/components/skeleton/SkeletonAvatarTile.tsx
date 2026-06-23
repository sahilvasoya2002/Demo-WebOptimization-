import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { avatar, spacing, RESIDENT_CARD_WIDTH } from '../../theme/layout';
import { MS } from '../../utils/responsive';
import { SkeletonPulse } from './SkeletonPulse';

interface SkeletonAvatarTileProps {
  size?: number;
}

function SkeletonAvatarTileComponent({ size = avatar.md }: SkeletonAvatarTileProps) {
  return (
    <SkeletonPulse style={styles.wrap}>
      <View style={[styles.avatar, { width: size, height: size }]} />
      <View style={styles.nameLine} />
    </SkeletonPulse>
  );
}

export const SkeletonAvatarTile = React.memo(SkeletonAvatarTileComponent);

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    width: RESIDENT_CARD_WIDTH,
  },
  avatar: {
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  nameLine: {
    width: '80%',
    height: MS(10),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
});
