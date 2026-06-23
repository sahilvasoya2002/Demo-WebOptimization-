import React, { useCallback, useMemo, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '../../../components/AppIcon';
import type { AppDispatch, RootState } from '../../../store/index';
import { setSearchQuery } from '../../../store/slices/filtersSlice';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { FILTER_HEADER_HEIGHT, spacing } from '../../../theme/layout';
import { sizes, weights } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';
import { CharacterFiltersModal } from './CharacterFiltersModal';

interface CharacterListHeaderProps {
  translateY: Animated.Value;
}

/**
 * CharacterListHeader Component
 * Renders the top search and filter header bar for the character screen, 
 * styled with neobrutalism buttons, a search text input field, and active filter count badges.
 * 
 * @param {CharacterListHeaderProps} props - The component props.
 * @param {Animated.Value} props.translateY - Animated value for vertical scrolling header transitions.
 */
function CharacterListHeaderComponent({ translateY }: CharacterListHeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, status, gender } = useSelector(
    (state: RootState) => state.filters,
  );
  const [filtersVisible, setFiltersVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const headerHeight = FILTER_HEADER_HEIGHT + insets.top;

  const activeFilterCount = useMemo(
    () => [status, gender].filter(Boolean).length,
    [gender, status],
  );

  const handleSearchChange = useCallback(
    (text: string) => {
      dispatch(setSearchQuery(text));
    },
    [dispatch],
  );

  const openFilters = useCallback(() => setFiltersVisible(true), []);
  const closeFilters = useCallback(() => setFiltersVisible(false), []);

  return (
    <>
      <Animated.View
        style={[
          styles.listHeader,
          {
            height: headerHeight,
            paddingTop: insets.top + spacing.sm,
            transform: [{ translateY }],
          },
        ]}>
        <Text style={styles.headerTitle}>Characters</Text>

        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <AppIcon name="search-outline" size={MS(18)} color={colors.text} />
            <TextInput
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Search characters..."
              placeholderTextColor={colors.textSubtle}
              style={styles.searchInput}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilterCount > 0 && styles.filterButtonActive,
            ]}
            onPress={openFilters}
            accessibilityLabel="Open filters"
            accessibilityRole="button">
            <AppIcon
              name="options-outline"
              size={MS(20)}
              color={activeFilterCount > 0 ? colors.accent : colors.text}
            />
            {activeFilterCount > 0 ? (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </Animated.View>

      <CharacterFiltersModal visible={filtersVisible} onClose={closeFilters} />
    </>
  );
}

export const CharacterListHeader = React.memo(CharacterListHeaderComponent);

const styles = StyleSheet.create({
  listHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    zIndex: 10,
    borderBottomWidth: brutal.borderWidth,
    borderBottomColor: brutal.borderColor,
  },
  headerTitle: {
    fontSize: sizes.xl,
    fontWeight: weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    paddingVertical: MS(10),
    paddingLeft: spacing.sm,
    color: colors.text,
    fontSize: sizes.base,
    fontWeight: weights.medium,
  },
  filterButton: {
    width: MS(44),
    height: MS(44),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
  },
  filterButtonActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  filterBadge: {
    position: 'absolute',
    top: MS(4),
    right: MS(4),
    minWidth: MS(16),
    height: MS(16),
    borderRadius: MS(8),
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: MS(4),
  },
  filterBadgeText: {
    fontSize: sizes.xxs,
    fontWeight: weights.bold,
    color: colors.onAccent,
  },
});
