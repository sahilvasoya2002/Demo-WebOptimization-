import React, { ReactNode } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { brutal } from '../theme/brutal';
import { SIMPLE_HEADER_HEIGHT, spacing } from '../theme/layout';
import { sizes, weights } from '../theme/typography';

interface BrutalScreenHeaderProps {
  title: string;
  translateY?: Animated.Value;
  height?: number;
  children?: ReactNode;
}

/**
 * Neobrutalist screen header supporting status-bar insets and hide-on-scroll translations.
 */
export function BrutalScreenHeader({
  title,
  translateY,
  height = SIMPLE_HEADER_HEIGHT,
  children,
}: BrutalScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = height + insets.top;

  const containerStyle = [
    styles.header,
    { height: headerHeight, paddingTop: insets.top + spacing.sm },
    translateY ? { transform: [{ translateY }] } : null,
  ];

  const Wrapper = translateY ? Animated.View : View;

  return (
    <Wrapper style={containerStyle}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </Wrapper>
  );
}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    zIndex: 10,
    borderBottomWidth: brutal.borderWidth,
    borderBottomColor: brutal.borderColor,
  },
  title: {
    fontSize: sizes.xl,
    fontWeight: weights.bold,
    color: colors.text,
  },
});
