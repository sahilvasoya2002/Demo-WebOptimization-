import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { BrutalScreenHeader } from '../../../components/BrutalScreenHeader';
import { ListStateView } from '../../../components/ListStateView';
import { ListLoadMoreFooter } from '../../../components/ListLoadMoreFooter';
import { SkeletonLocationRow } from '../../../components/skeleton/SkeletonLocationRow';
import { useHideHeaderOnScroll } from '../../../hooks/useHideHeaderOnScroll';
import { colors } from '../../../theme/colors';
import { LOCATION_ROW_HEIGHT, SIMPLE_HEADER_HEIGHT, spacing } from '../../../theme/layout';
import type { Location } from '../../../types/api';
import type { LocationsStackParamList } from '../../../navigation/types';
import { getErrorMessage } from '../../../utils/errors';
import { useLocations } from '../hooks/useLocations';
import { LocationRow } from '../components/LocationRow';

type NavigationProp = NativeStackNavigationProp<
  LocationsStackParamList,
  'Locations'
>;

/**
 * Locations screen listing all universe coordinates and settings.
 * Tapping a location navigates to the roster detail view.
 */
export function LocationsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { translateY, onScroll, headerHeight } = useHideHeaderOnScroll(SIMPLE_HEADER_HEIGHT);
  const { data, isLoading, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useLocations();

  const locations = useMemo(
    () => data?.pages.flatMap(page => page.results) ?? [],
    [data],
  );

  const handleLocationPress = useCallback(
    (id: number) => {
      navigation.navigate('LocationDetail', { locationId: id });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<Location> = useCallback(
    ({ item }) => <LocationRow location={item} onPress={handleLocationPress} />,
    [handleLocationPress],
  );

  const keyExtractor = useCallback((item: Location) => String(item.id), []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<Location> | null | undefined, index: number) => ({
      length: LOCATION_ROW_HEIGHT,
      offset: LOCATION_ROW_HEIGHT * index,
      index,
    }),
    [],
  );

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
        <BrutalScreenHeader title="Locations" translateY={translateY} />
        <View style={[styles.skeletonList, { paddingTop: headerHeight + spacing.sm }]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLocationRow key={`skeleton-${index}`} />
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
      <BrutalScreenHeader title="Locations" translateY={translateY} />
      <FlatList
        data={locations}
        renderItem={renderItem}
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
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <ListStateView message="No locations found" icon="search-outline" />
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
    paddingTop: SIMPLE_HEADER_HEIGHT + spacing.sm,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  skeletonList: {
    paddingTop: SIMPLE_HEADER_HEIGHT + spacing.sm,
    paddingBottom: spacing.xxl,
  },
});
