import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ListStateView } from '../../../components/ListStateView';
import { ListLoadMoreFooter } from '../../../components/ListLoadMoreFooter';
import { useHideHeaderOnScroll } from '../../../hooks/useHideHeaderOnScroll';
import { useDebounce } from '../../../hooks/useDebounce';
import type { RootState } from '../../../store/index';
import { colors } from '../../../theme/colors';
import { FILTER_HEADER_HEIGHT, GRID_COLUMNS, GRID_GAP, spacing } from '../../../theme/layout';
import type { Character } from '../../../types/api';
import type { CharactersStackParamList } from '../../../navigation/types';
import { CharacterCardData } from '../components/CharacterCard';
import { CharacterGridCard } from '../components/CharacterGridCard';
import { CharacterListHeader } from '../components/CharacterListHeader';
import { SkeletonGridCard } from '../components/SkeletonGridCard';
import { useCharacters } from '../hooks/useCharacters';
import { getErrorMessage } from '../../../utils/errors';

type NavigationProp = NativeStackNavigationProp<
  CharactersStackParamList,
  'CharacterList'
>;

/**
 * Helper to map character data to the structure needed by the card component.
 */
function toCardData(character: Character): CharacterCardData {
  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    location: character.location.name,
  };
}

/**
 * Character feed screen showing all characters in a grid list.
 * Supports searching, filtering, and infinite scroll pagination.
 */
export function  CharacterListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { searchQuery, status, gender } = useSelector(
    (state: RootState) => state.filters,
  );
  const debouncedSearch = useDebounce(searchQuery);
  const { translateY, onScroll, headerHeight } =
    useHideHeaderOnScroll(FILTER_HEADER_HEIGHT);

  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacters({ name: debouncedSearch, status, gender });

  const characters = useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  const handleCharacterPress = useCallback(
    (id: number) => {
      navigation.navigate('CharacterDetail', { id });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => (
      <CharacterGridCard
        character={toCardData(item)}
        onPress={handleCharacterPress}
      />
    ),
    [handleCharacterPress],
  );

  const keyExtractor = useCallback((item: Character) => String(item.id), []);

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
        <CharacterListHeader translateY={translateY} />
        <View style={[styles.skeletonGrid, { paddingTop: headerHeight + spacing.sm }]}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonGridCard key={`skeleton-${index}`} />
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
      <CharacterListHeader translateY={translateY} />
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={GRID_COLUMNS}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + spacing.sm },
        ]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <ListStateView
            message="No characters found"
            subtext="Try adjusting your search or filters."
            icon="search-outline"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: FILTER_HEADER_HEIGHT + spacing.sm,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    flexGrow: 1,
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: GRID_GAP,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: FILTER_HEADER_HEIGHT + spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
