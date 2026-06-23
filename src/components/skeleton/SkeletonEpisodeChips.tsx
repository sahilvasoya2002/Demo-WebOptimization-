import React from 'react';
import { StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/layout';
import { MS } from '../../utils/responsive';
import { SkeletonPulse } from './SkeletonPulse';

interface SkeletonEpisodeChipsProps {
  count?: number;
}

function SkeletonEpisodeChipsComponent({ count = 5 }: SkeletonEpisodeChipsProps) {
  return (
    <SkeletonPulse style={styles.row}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={`chip-${index}`} style={styles.chip} />
      ))}
    </SkeletonPulse>
  );
}

export const SkeletonEpisodeChips = React.memo(SkeletonEpisodeChipsComponent);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    width: MS(56),
    height: MS(32),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    marginRight: spacing.sm,
  },
});
