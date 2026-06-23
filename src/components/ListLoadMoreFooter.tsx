import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { brutal } from '../theme/brutal';
import { colors } from '../theme/colors';
import { GRID_GAP, spacing } from '../theme/layout';
import { MS } from '../utils/responsive';

interface ListLoadMoreFooterProps {
  loading: boolean;
}

/**
 * Loading indicator rendered at the bottom of lists during pagination.
 */
function ListLoadMoreFooterComponent({ loading }: ListLoadMoreFooterProps) {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.footer}>
      <View style={styles.indicatorWrap}>
        <View style={styles.indicatorShadow} />
        <View style={styles.indicatorBox}>
          <ActivityIndicator color={colors.text} size="small" />
        </View>
      </View>
    </View>
  );
}

export const ListLoadMoreFooter = React.memo(ListLoadMoreFooterComponent);

const styles = StyleSheet.create({
  footer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: GRID_GAP,
  },
  indicatorWrap: {
    alignSelf: 'center',
    marginTop: spacing.md,
    position: 'relative',
  },
  indicatorShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.badgeRadius,
    backgroundColor: brutal.borderColor,
  },
  indicatorBox: {
    backgroundColor: colors.card,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    padding: MS(10),
  },
});
