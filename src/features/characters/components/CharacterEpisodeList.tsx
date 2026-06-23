import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { spacing } from '../../../theme/layout';
import { typography } from '../../../theme/typography';
import type { Episode } from '../../../types/api';

interface CharacterEpisodeListProps {
  episodes: Episode[];
}

/**
 * CharacterEpisodeList Component
 * Renders a horizontal scroll list of episode code chips (e.g. S01E01) that the character appeared in.
 * 
 * @param {CharacterEpisodeListProps} props - The component props.
 * @param {Episode[]} props.episodes - List of episode details containing code strings.
 */
export function CharacterEpisodeList({ episodes }: CharacterEpisodeListProps) {
  const renderEpisode = useCallback(
    ({ item }: { item: Episode }) => (
      <View style={styles.episodeChip}>
        <Text style={styles.episodeCode}>{item.episode}</Text>
      </View>
    ),
    [],
  );

  const episodeKeyExtractor = useCallback((item: Episode) => String(item.id), []);

  return (
    <FlatList
      horizontal
      data={episodes}
      renderItem={renderEpisode}
      keyExtractor={episodeKeyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.episodeList}
    />
  );
}

const styles = StyleSheet.create({
  episodeList: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  episodeChip: {
    backgroundColor: colors.accentSoft,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: brutal.badgeRadius,
    marginRight: spacing.sm,
  },
  episodeCode: typography.accent,
});
