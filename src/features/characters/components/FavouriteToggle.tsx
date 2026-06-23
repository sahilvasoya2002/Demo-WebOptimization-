import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIcon } from '../../../components/AppIcon';
import type { AppDispatch, RootState } from '../../../store/index';
import {
  addToFavourites,
  makeSelectIsFavourite,
  removeFromFavourites,
} from '../../../store/slices/favouritesSlice';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { spacing } from '../../../theme/layout';
import { MS } from '../../../utils/responsive';
import type { CharacterCardData } from './CharacterCard';

interface FavouriteToggleProps {
  character: CharacterCardData;
}

/**
 * FavouriteToggle Component
 * Renders a brutalist style heart icon button that toggles a character's favorite status in Redux and SQLite database.
 * 
 * @param {FavouriteToggleProps} props - The component props.
 * @param {CharacterCardData} props.character - The character details to save or remove from favorites.
 */
export function FavouriteToggle({ character }: FavouriteToggleProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isFavourite = useSelector((state: RootState) =>
    makeSelectIsFavourite(character.id)(state),
  );

  const handleToggle = useCallback(() => {
    if (isFavourite) {
      dispatch(removeFromFavourites(character.id));
      return;
    }
    dispatch(
      addToFavourites({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
        location: character.location,
      }),
    );
  }, [character, dispatch, isFavourite]);

  return (
    <TouchableOpacity style={styles.favouriteButton} onPress={handleToggle}>
      <AppIcon
        name={isFavourite ? 'heart' : 'heart-outline'}
        size={MS(22)}
        color={isFavourite ? colors.favourite : colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favouriteButton: {
    backgroundColor: colors.card,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    padding: spacing.sm,
  },
});
