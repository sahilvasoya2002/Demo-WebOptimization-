import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BrutalBox } from './BrutalBox';
import { AppIcon } from './AppIcon';
import { colors } from '../theme/colors';
import { brutal } from '../theme/brutal';
import { spacing } from '../theme/layout';
import { typography } from '../theme/typography';
import { MS } from '../utils/responsive';

interface ListStateViewProps {
  message: string;
  subtext?: string;
  icon?: string;
  onRetry?: () => void;
}

// Renders empty, error, or loading states centered in a neobrutalist card.
// Supports an optional icon and a "Try Again" retry action.
export function ListStateView({ message, subtext, icon, onRetry }: ListStateViewProps) {
  return (
    <View style={styles.stateScreen}>
      <BrutalBox contentStyle={styles.stateCard}>
        {icon ? (
          <View style={styles.stateIcon}>
            <AppIcon
              name={icon}
              size={MS(36)}
              color={colors.text}
            />
          </View>
        ) : null}
        <Text style={styles.stateTitle}>{message}</Text>
        {subtext ? <Text style={styles.stateSubtext}>{subtext}</Text> : null}
      </BrutalBox>
      {onRetry ? (
        <View style={styles.retryWrap}>
          <View style={styles.retryShadow} />
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryLabel}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stateScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.background,
  },
  stateCard: {
    padding: spacing.xl,
    alignItems: 'center',
    minWidth: '80%',
    flexGrow: 0,
  },
  stateIcon: {
    marginBottom: spacing.md,
  },
  stateTitle: {
    ...typography.stateTitle,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  stateSubtext: {
    ...typography.stateMessage,
    textAlign: 'center',
  },
  retryWrap: {
    marginTop: spacing.lg,
    position: 'relative',
  },
  retryShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.badgeRadius,
    backgroundColor: brutal.borderColor,
  },
  retryButton: {
    backgroundColor: colors.accent,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    paddingHorizontal: spacing.xl,
    paddingVertical: MS(10),
  },
  retryLabel: typography.button,
});
