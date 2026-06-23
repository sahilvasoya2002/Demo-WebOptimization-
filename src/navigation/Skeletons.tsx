import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BrutalScreenHeader } from '../components/BrutalScreenHeader';
import { SkeletonCharacterDetail } from '../components/skeleton/SkeletonCharacterDetail';
import { SkeletonLocationDetail } from '../components/skeleton/SkeletonLocationDetail';
import { SkeletonEpisodeRow, SkeletonSeasonBadge } from '../components/skeleton/SkeletonEpisodeRow';
import { SkeletonLocationRow } from '../components/skeleton/SkeletonLocationRow';
import { SkeletonGridCard } from '../features/characters/components/SkeletonGridCard';
import { SkeletonCard } from '../features/characters/components/SkeletonCard';
import { colors } from '../theme/colors';
import { SIMPLE_HEADER_HEIGHT, spacing } from '../theme/layout';

// Loading skeletons displayed when navigating between lazy-loaded screens

// Skeleton for character list (renders header + card grid)
export function CharacterListSkeleton() {
  return (
    <View style={styles.container}>
      <BrutalScreenHeader title="Characters" />
      <View style={styles.gridContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonGridCard key={`lazy-char-${index}`} />
        ))}
      </View>
    </View>
  );
}

// Loader for character details
export function CharacterDetailSkeleton() {
  return <SkeletonCharacterDetail />;
}

// List skeleton for episodes screen
export function EpisodesSkeleton() {
  return (
    <View style={styles.container}>
      <BrutalScreenHeader title="Episodes" />
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <SkeletonSeasonBadge />
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonEpisodeRow key={`lazy-ep1-${index}`} />
        ))}
        <SkeletonSeasonBadge />
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonEpisodeRow key={`lazy-ep2-${index}`} />
        ))}
      </ScrollView>
    </View>
  );
}

// List skeleton for locations screen
export function LocationsSkeleton() {
  return (
    <View style={styles.container}>
      <BrutalScreenHeader title="Locations" />
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonLocationRow key={`lazy-loc-${index}`} />
        ))}
      </ScrollView>
    </View>
  );
}

// Loader for location details
export function LocationDetailSkeleton() {
  return <SkeletonLocationDetail />;
}

// List skeleton for favourites screen
export function FavouritesSkeleton() {
  return (
    <View style={styles.container}>
      <BrutalScreenHeader title="Favourites" />
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={`lazy-fav-${index}`} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: SIMPLE_HEADER_HEIGHT + spacing.sm + spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  listScroll: {
    paddingTop: SIMPLE_HEADER_HEIGHT + spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
});
