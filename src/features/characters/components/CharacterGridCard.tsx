import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RemoteImage } from '../../../components/RemoteImage';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppIcon } from '../../../components/AppIcon';
import { colors, statusColor } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { MS } from '../../../utils/responsive';
import type { CharacterCardData } from './CharacterCard';
import { CharacterInfoModal } from './CharacterInfoModal';
import { styles } from './CharacterGridCard.styles';

interface CharacterGridCardProps {
  character: CharacterCardData;
  onPress: (id: number) => void;
}

/**
 * Grid layout card for character listing. Includes neobrutalist borders,
 * status dot, details icon, and animated hover translation on press.
 */
function CharacterGridCardComponent({ character, onPress }: CharacterGridCardProps) {
  const [infoVisible, setInfoVisible] = useState(false);
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

  const handleInfoPress = useCallback(() => {
    setInfoVisible(true);
  }, []);

  const handleInfoClose = useCallback(() => {
    setInfoVisible(false);
  }, []);

  return (
    <>
      <View style={styles.gridCardWrap}>
        <View style={styles.gridCardShadow} />
        <Animated.View style={[styles.gridCardAnim, cardAnim]}>
          <View style={styles.gridCard}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handlePress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.imagePress}>
              <RemoteImage uri={character.image} style={styles.gridImage} />
            </TouchableOpacity>

            <View style={styles.statusIndicator} pointerEvents="none">
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: statusColor(character.status) },
                ]}
              />
            </View>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleInfoPress}
              accessibilityLabel={`${character.name} info`}
              accessibilityRole="button"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <AppIcon
                name="information-circle-outline"
                size={MS(16)}
                color={colors.text}
              />
            </TouchableOpacity>

            <View style={styles.nameBar} pointerEvents="none">
              <Text style={styles.nameBarText} numberOfLines={1}>
                {character.name}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <CharacterInfoModal
        visible={infoVisible}
        character={character}
        onClose={handleInfoClose}
      />
    </>
  );
}

export const CharacterGridCard = React.memo(CharacterGridCardComponent);
