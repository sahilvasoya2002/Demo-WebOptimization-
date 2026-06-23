import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { brutal } from '../../theme/brutal';
import { colors } from '../../theme/colors';
import { avatar, screenPadding, spacing } from '../../theme/layout';
import { MS } from '../../utils/responsive';
import { SkeletonPulse } from './SkeletonPulse';

function SkeletonCharacterDetailComponent() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <SkeletonPulse style={styles.heroWrap}>
        <View style={styles.heroShadow} />
        <View style={styles.heroCard}>
          <View style={styles.heroImage} />
          <View style={styles.titleLine} />
          <View style={styles.chipLine} />
        </View>
      </SkeletonPulse>

      <SkeletonPulse style={styles.sectionWrap}>
        <View style={styles.sectionShadow} />
        <View style={styles.infoCard}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={`field-${index}`}
              style={[styles.fieldRow, index === 3 && styles.fieldRowLast]}>
              <View style={styles.fieldLabel} />
              <View style={styles.fieldValue} />
            </View>
          ))}
        </View>
      </SkeletonPulse>

      <SkeletonPulse style={styles.sectionWrap}>
        <View style={styles.sectionShadow} />
        <View style={styles.episodesCard}>
          <View style={styles.sectionTitle} />
          <View style={styles.chipRow}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={`chip-${index}`} style={styles.chip} />
            ))}
          </View>
        </View>
      </SkeletonPulse>
    </ScrollView>
  );
}

export const SkeletonCharacterDetail = React.memo(SkeletonCharacterDetailComponent);

const heroSize = avatar.lg;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: screenPadding,
    paddingBottom: spacing.xxl,
  },
  heroWrap: {
    marginBottom: spacing.lg,
  },
  heroShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroImage: {
    width: heroSize,
    height: heroSize,
    borderRadius: heroSize / 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  titleLine: {
    width: '55%',
    height: MS(24),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  chipLine: {
    width: MS(120),
    height: MS(28),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
  sectionWrap: {
    marginBottom: spacing.lg,
  },
  sectionShadow: {
    position: 'absolute',
    top: brutal.shadowOffset,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    bottom: -brutal.shadowOffset,
    borderRadius: brutal.radius,
    backgroundColor: brutal.borderColor,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  fieldRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: brutal.borderWidth,
    borderBottomColor: colors.border,
    gap: spacing.xs,
  },
  fieldRowLast: {
    borderBottomWidth: 0,
  },
  fieldLabel: {
    width: '30%',
    height: MS(12),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
  fieldValue: {
    width: '60%',
    height: MS(14),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
  episodesCard: {
    backgroundColor: colors.card,
    borderRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.lg,
  },
  sectionTitle: {
    width: MS(80),
    height: MS(16),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    width: MS(56),
    height: MS(32),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
});
