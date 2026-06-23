import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppIcon } from '../components/AppIcon';
import { colors } from '../theme/colors';
import { MS } from '../utils/responsive';

/**
 * Container badge that highlights the active tab icon.
 */
function ActiveIconBadge({
  children,
  focused,
  activeBg,
}: {
  children: ReactNode;
  focused?: boolean;
  activeBg: string;
}) {
  if (!focused) {
    return <View style={styles.inactiveIconContainer}>{children}</View>;
  }
  return (
    <View style={styles.activeBadgeContainer}>
      <View style={styles.activeBadgeShadow} />
      <View style={[styles.activeBadgeContent, { backgroundColor: activeBg }]}>
        {children}
      </View>
    </View>
  );
}

export const CharactersIcon = ({ focused, color, size }: { focused?: boolean; color: string; size: number }) => (
  <ActiveIconBadge focused={focused} activeBg={colors.accentSoft}>
    <AppIcon name="people-outline" color={focused ? colors.accent : color} size={size} />
  </ActiveIconBadge>
);

export const EpisodesIcon = ({ focused, color, size }: { focused?: boolean; color: string; size: number }) => (
  <ActiveIconBadge focused={focused} activeBg={colors.accentSoft}>
    <AppIcon name="tv-outline" color={focused ? colors.accent : color} size={size} />
  </ActiveIconBadge>
);

export const LocationsIcon = ({ focused, color, size }: { focused?: boolean; color: string; size: number }) => (
  <ActiveIconBadge focused={focused} activeBg={colors.accentSoft}>
    <AppIcon name="earth-outline" color={focused ? colors.accent : color} size={size} />
  </ActiveIconBadge>
);

export const FavouritesIcon = ({
  focused,
  color,
  size,
}: {
  focused?: boolean;
  color: string;
  size: number;
}) => (
  <ActiveIconBadge focused={focused} activeBg="#FFE4E6">
    <AppIcon
      name={focused ? 'heart' : 'heart-outline'}
      color={focused ? colors.favourite : color}
      size={size}
    />
  </ActiveIconBadge>
);

const styles = StyleSheet.create({
  activeBadgeContainer: {
    position: 'relative',
    width: MS(52),
    height: MS(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: MS(3),
  },
  activeBadgeShadow: {
    position: 'absolute',
    top: MS(1.5),
    left: MS(1.5),
    right: -MS(1.5),
    bottom: -MS(1.5),
    borderRadius: MS(14),
    backgroundColor: colors.text,
  },
  activeBadgeContent: {
    width: '100%',
    height: '100%',
    borderRadius: MS(14),
    borderWidth: MS(1.5),
    borderColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    width: MS(52),
    height: MS(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: MS(3),
  },
});
