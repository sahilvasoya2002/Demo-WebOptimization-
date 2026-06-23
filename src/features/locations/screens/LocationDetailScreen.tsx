import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import { BrutalBox } from '../../../components/BrutalBox';
import { RemoteImage } from '../../../components/RemoteImage';
import { ListStateView } from '../../../components/ListStateView';
import { SkeletonLocationDetail } from '../../../components/skeleton/SkeletonLocationDetail';
import { SkeletonAvatarTile } from '../../../components/skeleton/SkeletonAvatarTile';
import type { Character } from '../../../types/api';
import type { LocationsStackParamList } from '../../../navigation/types';
import { getErrorMessage } from '../../../utils/errors';
import { useLocation } from '../hooks/useLocations';
import { useResidents } from '../hooks/useResidents';
import { styles } from './LocationDetailScreen.styles';

type DetailRoute = RouteProp<LocationsStackParamList, 'LocationDetail'>;

function ResidentTile({ item }: { item: Character }) {
  return (
    <BrutalBox
      style={styles.residentTileWrap}
      contentStyle={styles.residentTile}>
      <RemoteImage uri={item.image} style={styles.residentAvatar} />
      <Text style={styles.residentName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
    </BrutalBox>
  );
}

/**
 * LocationDetailScreen Component
 * Displays the details of a single location, including its header details (dimension, type),
 * and a responsive 3-column grid of residents residing at that location.
 */
export function LocationDetailScreen() {
  const route = useRoute<DetailRoute>();
  const { data: location, isLoading, isError, error, refetch } = useLocation(
    route.params.locationId,
  );
  const residentQueries = useResidents(location?.residents ?? []);
  const residentsLoading = residentQueries.some(query => query.isLoading);
  const residents = residentQueries
    .map(query => query.data)
    .filter((character): character is Character => character !== undefined);

  const renderResident: ListRenderItem<Character> = useCallback(
    ({ item }) => <ResidentTile item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Character) => String(item.id), []);

  if (isLoading) {
    return <SkeletonLocationDetail />;
  }

  if (isError || !location) {
    return (
      <ListStateView
        message={getErrorMessage(error)}
        icon="alert-circle-outline"
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View style={styles.detailScreen}>
      <BrutalBox style={styles.headerWrap} contentStyle={styles.headerCard}>
        <Text style={styles.locationTitle}>{location.name}</Text>
        <Text style={styles.locationMeta}>{location.type}</Text>
        <Text style={styles.locationDimension}>{location.dimension}</Text>
      </BrutalBox>

      <Text style={styles.residentsHeading}>Residents</Text>
      {residentsLoading ? (
        <View style={styles.residentGrid}>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <View key={`skeleton-row-${rowIndex}`} style={styles.residentRow}>
              {Array.from({ length: 3 }).map((__, colIndex) => (
                <SkeletonAvatarTile key={`skeleton-tile-${rowIndex}-${colIndex}`} />
              ))}
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={residents}
          renderItem={renderResident}
          keyExtractor={keyExtractor}
          numColumns={3}
          columnWrapperStyle={styles.residentRow}
          contentContainerStyle={styles.residentGrid}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={8}
          ListEmptyComponent={
            <Text style={styles.emptyResidents}>No residents found.</Text>
          }
        />
      )}
    </View>
  );
}
