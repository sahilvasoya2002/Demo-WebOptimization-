import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrutalBox } from '../../../components/BrutalBox';
import { AppIcon } from '../../../components/AppIcon';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { LOCATION_ROW_HEIGHT, spacing } from '../../../theme/layout';
import { typography } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';
import { getLocationTypeConfig } from '../../../utils/url';
import type { Location } from '../../../types/api';

interface LocationRowProps {
  location: Location;
  onPress: (id: number) => void;
}

/**
 * Neobrutalist card row representing a location.
 */
function LocationRowComponent({ location, onPress }: LocationRowProps) {
  const handlePress = useCallback(() => {
    onPress(location.id);
  }, [location.id, onPress]);

  const config = useMemo(() => {
    return getLocationTypeConfig(location.type);
  }, [location.type]);

  return (
    <BrutalBox
      style={styles.locationRowWrap}
      contentStyle={styles.locationRow}
      onPress={handlePress}>
      <View style={[styles.iconBadge, { backgroundColor: config.bg }]}>
        <AppIcon name={config.icon} color={config.color} size={MS(20)} />
      </View>
      <View style={styles.locationMeta}>
        <Text style={styles.locationName} numberOfLines={1}>
          {location.name}
        </Text>
        <View style={styles.subtitleRow}>
          <Text style={[styles.locationTypeBadge, { color: config.color }]}>
            {location.type}
          </Text>
          <Text style={styles.bulletSeparator}>•</Text>
          <Text style={styles.locationDimension} numberOfLines={1}>
            {location.dimension}
          </Text>
        </View>
      </View>
    </BrutalBox>
  );
}

export const LocationRow = React.memo(LocationRowComponent);

const styles = StyleSheet.create({
  locationRowWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: MS(10),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: MS(12),
    minHeight: LOCATION_ROW_HEIGHT - MS(10),
  },
  iconBadge: {
    width: MS(42),
    height: MS(42),
    borderRadius: MS(8),
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  locationMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  locationName: {
    ...typography.rowTitle,
    marginBottom: spacing.xs,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTypeBadge: {
    ...typography.captionMedium,
    fontWeight: 'bold',
  },
  bulletSeparator: {
    marginHorizontal: spacing.xs,
    color: colors.textSubtle,
    fontSize: MS(10),
  },
  locationDimension: {
    ...typography.caption,
    flex: 1,
  },
});
