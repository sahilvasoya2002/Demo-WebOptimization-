import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, Text, View } from 'react-native';
import { BrutalScreenHeader } from '../../../components/BrutalScreenHeader';
import { ListStateView } from '../../../components/ListStateView';
import { ListLoadMoreFooter } from '../../../components/ListLoadMoreFooter';
import {
  SkeletonEpisodeRow,
  SkeletonSeasonBadge,
} from '../../../components/skeleton/SkeletonEpisodeRow';
import { useHideHeaderOnScroll } from '../../../hooks/useHideHeaderOnScroll';
import { SIMPLE_HEADER_HEIGHT, spacing } from '../../../theme/layout';
import type { Episode } from '../../../types/api';
import { getSeasonTheme, seasonFromEpisodeCode } from '../../../utils/url';
import { getErrorMessage } from '../../../utils/errors';
import { EpisodeRow } from '../components/EpisodeListItems';
import { EpisodeCharactersModal } from '../components/EpisodeCharactersModal';
import { useEpisodes } from '../hooks/useEpisodes';
import { styles } from './EpisodesScreen.styles';

interface EpisodeSection {
  title: string;
  data: Episode[];
}

/**
 * Renders the episodes feed grouped by season.
 * Tapping an episode opens the character roster modal.
 */
export function EpisodesScreen() {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);
  const { translateY, onScroll, headerHeight } = useHideHeaderOnScroll(SIMPLE_HEADER_HEIGHT);
  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useEpisodes();

  const episodes = useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  const sections = useMemo<EpisodeSection[]>(() => {
    
    const grouped = new Map<string, Episode[]>();
    episodes.forEach(episode => {
      const season = seasonFromEpisodeCode(episode.episode);
      const existing = grouped.get(season) ?? [];
      existing.push(episode);
      grouped.set(season, existing);
    });
    return Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([title, sectionEpisodes]) => ({ title, data: sectionEpisodes }));
  }, [episodes]);

  const handleEpisodePress = useCallback((id: number) => {
    setSelectedEpisodeId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedEpisodeId(null);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Episode }) => (
      <EpisodeRow
        episodeCode={item.episode}
        name={item.name}
        airDate={item.air_date}
        onPress={() => handleEpisodePress(item.id)}
      />
    ),
    [handleEpisodePress],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: EpisodeSection }) => {
      const theme = getSeasonTheme(section.title);
      const displayTitle = `Season ${section.title.replace('S', '')}`;
      return (
        <View style={styles.seasonSectionHeaderRow}>
          <View style={[styles.headerLine, styles.headerLineLeft]} />
          <View style={[styles.seasonBadge, { backgroundColor: theme.bg }]}>
            <Text style={[styles.seasonHeader, { color: theme.color }]}>{displayTitle}</Text>
          </View>
          <View style={[styles.headerLine, styles.headerLineRight]} />
        </View>
      );
    },
    [],
  );

  const keyExtractor = useCallback((item: Episode) => String(item.id), []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderFooter = useCallback(
    () => <ListLoadMoreFooter loading={isFetchingNextPage} />,
    [isFetchingNextPage],
  );

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <BrutalScreenHeader title="Episodes" translateY={translateY} />
        <View style={[styles.skeletonList, { paddingTop: headerHeight + spacing.sm }]}>
          <SkeletonSeasonBadge />
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonEpisodeRow key={`s1-${index}`} />
          ))}
          <SkeletonSeasonBadge />
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonEpisodeRow key={`s2-${index}`} />
          ))}
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <ListStateView
        message={getErrorMessage(error)}
        icon="alert-circle-outline"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <BrutalScreenHeader title="Episodes" translateY={translateY} />
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + spacing.sm },
        ]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <ListStateView message="No episodes found" icon="search-outline" />
        }
      />
      <EpisodeCharactersModal
        episodeId={selectedEpisodeId}
        onClose={handleCloseModal}
      />
    </View>
  );
}
