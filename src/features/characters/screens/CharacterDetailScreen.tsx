import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BrutalBox } from '../../../components/BrutalBox';
import { RemoteImage } from '../../../components/RemoteImage';
import { ListStateView } from '../../../components/ListStateView';
import { SkeletonCharacterDetail } from '../../../components/skeleton/SkeletonCharacterDetail';
import { SkeletonEpisodeChips } from '../../../components/skeleton/SkeletonEpisodeChips';
import type { CharactersStackParamList } from '../../../navigation/types';
import { statusColor } from '../../../theme/colors';
import type { Episode } from '../../../types/api';
import { extractIdFromApiUrl } from '../../../utils/url';
import { getErrorMessage } from '../../../utils/errors';
import { CharacterEpisodeList } from '../components/CharacterEpisodeList';
import { FavouriteToggle } from '../components/CharacterCard';
import { useCharacter } from '../hooks/useCharacters';
import { useCharacterEpisodes } from '../hooks/useCharacterEpisodes';
import { styles } from './CharacterDetailScreen.styles';

type DetailRoute = RouteProp<CharactersStackParamList, 'CharacterDetail'>;
type NavigationProp = NativeStackNavigationProp<CharactersStackParamList>;

/**
 * Profile detail screen for a single character.
 * Displays information card, location details, and the episodes list.
 */
export function CharacterDetailScreen() {
  const route = useRoute<DetailRoute>();
  const navigation = useNavigation<NavigationProp>();
  const { data: character, isLoading, isError, error, refetch } = useCharacter(
    route.params.id,
  );

  const episodeQueries = useCharacterEpisodes(character?.episode ?? []);
  const episodesLoading = episodeQueries.some(query => query.isLoading);
  const episodes = useMemo(
    () =>
      episodeQueries
        .map(query => query.data)
        .filter((episode): episode is Episode => episode !== undefined),
    [episodeQueries],
  );

  const navigateToLocation = useCallback(
    (url: string) => {
      const locationId = extractIdFromApiUrl(url);
      const tabNavigation = navigation.getParent()?.getParent();
      tabNavigation?.navigate('LocationsTab', {
        screen: 'LocationDetail',
        params: { locationId },
      });
    },
    [navigation],
  );

  if (isLoading) {
    return <SkeletonCharacterDetail />;
  }

  if (isError || !character) {
    return (
      <ListStateView
        message={getErrorMessage(error)}
        onRetry={() => refetch()}
      />
    );
  }

  const favouriteData = {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    image: character.image,
    location: character.location.name,
  };

  return (
    <ScrollView
      style={styles.detailScreen}
      contentContainerStyle={styles.detailContent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <BrutalBox style={styles.heroCardWrap} contentStyle={styles.heroCard}>
        <View style={styles.heroImageRing}>
          <RemoteImage uri={character?.image} style={styles.heroImage} />
        </View>
        <View style={styles.favouriteWrap}>
          <FavouriteToggle character={favouriteData} />
        </View>
        <Text style={styles.characterTitle}>{character.name}</Text>
        <View style={styles.statusChip}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor(character.status) },
            ]}
          />
          <Text style={styles.metaText}>
            {character.status} · {character.species}
          </Text>
        </View>
      </BrutalBox>

      <BrutalBox style={styles.sectionWrap} contentStyle={styles.infoCard}>
        <DetailField label="Gender" value={character.gender} />
        <DetailField label="Type" value={character.type || 'N/A'} />
        <DetailField
          label="Origin"
          value={character.origin.name}
          onPress={() => navigateToLocation(character.origin.url)}
          link
        />
        <DetailField
          label="Last location"
          value={character.location.name}
          onPress={() => navigateToLocation(character.location.url)}
          link
          last
        />
      </BrutalBox>

      <BrutalBox style={styles.sectionWrap} contentStyle={styles.episodesCard}>
        <Text style={styles.sectionTitle}>Episodes</Text>
        {episodesLoading ? (
          <SkeletonEpisodeChips />
        ) : (
          <CharacterEpisodeList episodes={episodes} />
        )}
      </BrutalBox>
    </ScrollView>
  );
}

interface DetailFieldProps {
  label: string;
  value: string;
  onPress?: () => void;
  link?: boolean;
  last?: boolean;
}

/**
 * DetailField Component
 * Renders a labeled property row in the detail screen, with support for link actions.
 * 
 * @param {DetailFieldProps} props - The component props.
 * @param {string} props.label - The field name label.
 * @param {string} props.value - The property value text.
 * @param {() => void} [props.onPress] - Click handler for value links.
 * @param {boolean} [props.link=false] - Whether the value is styled as a hyperlink.
 * @param {boolean} [props.last=false] - Whether this is the final item (disables bottom border line).
 */
function DetailField({ label, value, onPress, link, last }: DetailFieldProps) {
  const valueNode = (
    <Text style={link ? styles.linkValue : styles.fieldValue}>{value}</Text>
  );

  return (
    <View style={[styles.fieldRow, last && styles.fieldRowLast]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>{valueNode}</TouchableOpacity>
      ) : (
        valueNode
      )}
    </View>
  );
}
