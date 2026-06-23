import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { avatar, MODAL_AVATAR_WIDTH } from '../../theme/layout';
import { MS } from '../../utils/responsive';
import { SkeletonPulse } from './SkeletonPulse';

interface SkeletonModalAvatarProps {
  size?: number;
}

function SkeletonModalAvatarComponent({ size = avatar.sm }: SkeletonModalAvatarProps) {
  return (
    <SkeletonPulse style={styles.wrap}>
      <View style={[styles.avatar, { width: size, height: size }]} />
      <View style={styles.nameLine} />
    </SkeletonPulse>
  );
}

export const SkeletonModalAvatar = React.memo(SkeletonModalAvatarComponent);

const styles = StyleSheet.create({
  wrap: {
    width: MODAL_AVATAR_WIDTH,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
    marginBottom: MS(6),
  },
  nameLine: {
    width: '90%',
    height: MS(10),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
});
