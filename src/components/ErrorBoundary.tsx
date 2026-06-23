import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { brutal } from '../theme/brutal';
import { spacing } from '../theme/layout';
import { typography } from '../theme/typography';
import { MS } from '../utils/responsive';
import { BrutalBox } from './BrutalBox';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {}

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <View style={styles.fallbackScreen}>
          <BrutalBox contentStyle={styles.fallbackCard}>
            <Text style={styles.fallbackTitle}>Something went wrong</Text>
            <Text style={styles.fallbackMessage}>
              The app ran into an unexpected error.
            </Text>
          </BrutalBox>
          <View style={styles.retryWrap}>
            <View style={styles.retryShadow} />
            <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
              <Text style={styles.retryLabel}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  fallbackScreen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  fallbackCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  fallbackTitle: {
    ...typography.screenTitle,
    fontSize: MS(20),
    marginBottom: spacing.sm,
  },
  fallbackMessage: typography.stateMessage,
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
