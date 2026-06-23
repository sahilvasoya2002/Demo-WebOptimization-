import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RemoteImage } from '../../../components/RemoteImage';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppIcon } from '../../../components/AppIcon';
import { colors, formatStatusLabel, statusColor } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { CARD_HEIGHT } from '../../../theme/layout';
import type { CharacterStatus } from '../../../types/api';
import { MS } from '../../../utils/responsive';
import { styles } from './CharacterCard.styles';

export { CARD_HEIGHT };

export interface CharacterCardData {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  image: string;
  location: string;
}

interface CharacterCardProps {
  character: CharacterCardData;
  onPress: (id: number) => void;
  showRemove?: boolean;
  onRemove?: (id: number) => void;
}

/**
 * CharacterCard Component
 * Displays character details (avatar, name, status badge, species, location) in a row-based layout.
 * 
 * @param {CharacterCardProps} props - The component props.
 * @param {CharacterCardData} props.character - The character details to display.
 * @param {(id: number) => void} props.onPress - Callback triggered when the card is pressed.
 * @param {boolean} [props.showRemove=false] - Whether to show a delete/remove button.
 * @param {(id: number) => void} [props.onRemove] - Callback triggered when the remove button is pressed.
 */
function CharacterCardComponent({
  character,
  onPress,
  showRemove = false,
  onRemove,
}: CharacterCardProps) {
  const shift = useSharedValue(0);

  const cardAnim = useAnimatedStyle(() => ({
    transform: [
      { translateX: shift.value },
      { translateY: shift.value },
    ],
  }));

  const handlePressIn = useCallback(() => {
    shift.value = withTiming(brutal.shadowOffset, { duration: 80 });
  }, [shift]);

  const handlePressOut = useCallback(() => {
    shift.value = withTiming(0, { duration: 80 });
  }, [shift]);

  const handlePress = useCallback(() => {
    onPress(character.id);
  }, [character.id, onPress]);

  const handleRemove = useCallback(() => {
    onRemove?.(character.id);
  }, [character.id, onRemove]);

  return (
    <View style={styles.listCardWrap}>
      <View style={styles.listCardShadow} />
      <Animated.View style={[styles.listCardAnim, cardAnim]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.characterCard}>
          <RemoteImage uri={character.image} style={styles.avatarImage} />
          <View style={styles.characterMeta}>
            <Text style={styles.characterName} numberOfLines={1}>
              {character.name}
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: statusColor(character.status) },
                ]}
              />
              <Text style={styles.statusText}>
                {formatStatusLabel(character.status)}
              </Text>
            </View>
            <Text style={styles.speciesLabel}>{character.species}</Text>
            <Text style={styles.locationLabel} numberOfLines={1}>
              {character.location}
            </Text>
          </View>
          {showRemove ? (
            <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
              <AppIcon name="trash-outline" size={MS(18)} color={colors.text} />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export const CharacterCard = React.memo(CharacterCardComponent);

export { FavouriteToggle } from './FavouriteToggle';
