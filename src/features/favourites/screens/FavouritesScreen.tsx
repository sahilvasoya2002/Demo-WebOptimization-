import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BrutalScreenHeader } from '../../../components/BrutalScreenHeader';
import { ListStateView } from '../../../components/ListStateView';
import { useHideHeaderOnScroll } from '../../../hooks/useHideHeaderOnScroll';
import type { FavouritesStackParamList } from '../../../navigation/types';
import type { AppDispatch, RootState } from '../../../store/index';
import { removeFromFavourites } from '../../../store/slices/favouritesSlice';
import { colors } from '../../../theme/colors';
import { LIST_ITEM_HEIGHT, SIMPLE_HEADER_HEIGHT, spacing } from '../../../theme/layout';
import type { FavouriteRow } from '../../../types/api';
import {
  CharacterCard,
  CharacterCardData,
} from '../../characters/components/CharacterCard';

type NavigationProp = NativeStackNavigationProp<
  FavouritesStackParamList,
  'Favourites'
>;

function toCardData(item: FavouriteRow): CharacterCardData {
  return {
    id: item.id,
    name: item.name,
    status: item.status,
    species: item.species,
    image: item.image,
    location: item.location,
  };
}

/**
 * FavouritesScreen Component
 * Displays a list of all favorite characters saved by the user in their local SQLite database.
 * Supports offline mode, removal from favorites directly, and navigation to detailed character views.
 */
export function FavouritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const { translateY, onScroll, headerHeight } = useHideHeaderOnScroll(SIMPLE_HEADER_HEIGHT);

  const handleRemove = useCallback(
    (id: number) => {
      dispatch(removeFromFavourites(id));
    },
    [dispatch],
  );

  const handlePress = useCallback(
    (id: number) => {
      navigation.navigate('CharacterDetail', { id });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<FavouriteRow> = useCallback(
    ({ item }) => (
      <CharacterCard
        character={toCardData(item)}
        onPress={handlePress}
        showRemove
        onRemove={handleRemove}
      />
    ),
    [handlePress, handleRemove],
  );

  const keyExtractor = useCallback((item: FavouriteRow) => String(item.id), []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<FavouriteRow> | null | undefined, index: number) => ({
      length: LIST_ITEM_HEIGHT,
      offset: LIST_ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  if (favourites.length === 0) {
    return (
      <View style={styles.screen}>
        <BrutalScreenHeader title="Favourites" />
        <View style={[styles.emptyContent, { paddingTop: headerHeight }]}>
          <ListStateView
            message="No favourites yet"
            subtext="Save characters from the detail screen."
            icon="heart-dislike-outline"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <BrutalScreenHeader title="Favourites" translateY={translateY} />
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + spacing.sm },
        ]}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
  emptyContent: {
    flex: 1,
    paddingTop: SIMPLE_HEADER_HEIGHT,
  },
});
