import React, { Suspense, ReactNode, lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { brutal } from '../theme/brutal';
import { sizes, weights } from '../theme/typography';
import type {
  CharactersStackParamList,
  EpisodesStackParamList,
  FavouritesStackParamList,
  LocationsStackParamList,
} from './types';
import {
  CharacterDetailSkeleton,
  CharacterListSkeleton,
  EpisodesSkeleton,
  FavouritesSkeleton,
  LocationDetailSkeleton,
  LocationsSkeleton,
} from './Skeletons';

const LazyCharacterDetail = lazy(() =>
  import('../features/characters/screens/CharacterDetailScreen').then(m => ({
    default: m.CharacterDetailScreen,
  })),
);
const LazyCharacterList = lazy(() =>
  import('../features/characters/screens/CharacterListScreen').then(m => ({
    default: m.CharacterListScreen,
  })),
);
const LazyEpisodes = lazy(() =>
  import('../features/episodes/screens/EpisodesScreen').then(m => ({
    default: m.EpisodesScreen,
  })),
);
const LazyFavourites = lazy(() =>
  import('../features/favourites/screens/FavouritesScreen').then(m => ({
    default: m.FavouritesScreen,
  })),
);
const LazyLocationDetail = lazy(() =>
  import('../features/locations/screens/LocationDetailScreen').then(m => ({
    default: m.LocationDetailScreen,
  })),
);
const LazyLocations = lazy(() =>
  import('../features/locations/screens/LocationsScreen').then(m => ({
    default: m.LocationsScreen,
  })),
);

// HOC to inject screen skeletons while lazy loading chunks
function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  fallback: ReactNode,
) {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
  WrappedComponent.displayName = `WithSuspense(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

const CharacterDetail = withSuspense(LazyCharacterDetail, <CharacterDetailSkeleton />);
const CharacterList = withSuspense(LazyCharacterList, <CharacterListSkeleton />);
const Episodes = withSuspense(LazyEpisodes, <EpisodesSkeleton />);
const Favourites = withSuspense(LazyFavourites, <FavouritesSkeleton />);
const LocationDetail = withSuspense(LazyLocationDetail, <LocationDetailSkeleton />);
const Locations = withSuspense(LazyLocations, <LocationsSkeleton />);

const CharactersStack = createNativeStackNavigator<CharactersStackParamList>();
const EpisodesStack = createNativeStackNavigator<EpisodesStackParamList>();
const LocationsStack = createNativeStackNavigator<LocationsStackParamList>();
const FavouritesStack = createNativeStackNavigator<FavouritesStackParamList>();

export const stackScreenOptions = {
  headerStyle: {
    backgroundColor: colors.surface,
    borderBottomWidth: brutal.borderWidth,
    borderBottomColor: brutal.borderColor,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontWeight: weights.bold,
    fontSize: sizes.lg,
  },
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal' as const,
  contentStyle: { backgroundColor: colors.background },
  headerBorderVisible: true,
};

export function CharactersStackNavigator() {
  return (
    <CharactersStack.Navigator screenOptions={stackScreenOptions}>
      <CharactersStack.Screen
        name="CharacterList"
        component={CharacterList}
        options={{ headerShown: false }}
      />
      <CharactersStack.Screen
        name="CharacterDetail"
        component={CharacterDetail}
        options={{ title: 'Character' }}
      />
    </CharactersStack.Navigator>
  );
}

export function EpisodesStackNavigator() {
  return (
    <EpisodesStack.Navigator screenOptions={stackScreenOptions}>
      <EpisodesStack.Screen
        name="Episodes"
        component={Episodes}
        options={{ headerShown: false }}
      />
    </EpisodesStack.Navigator>
  );
}

export function LocationsStackNavigator() {
  return (
    <LocationsStack.Navigator screenOptions={stackScreenOptions}>
      <LocationsStack.Screen
        name="Locations"
        component={Locations}
        options={{ headerShown: false }}
      />
      <LocationsStack.Screen
        name="LocationDetail"
        component={LocationDetail}
        options={{ title: 'Location' }}
      />
    </LocationsStack.Navigator>
  );
}

export function FavouritesStackNavigator() {
  return (
    <FavouritesStack.Navigator screenOptions={stackScreenOptions}>
      <FavouritesStack.Screen
        name="Favourites"
        component={Favourites}
        options={{ headerShown: false }}
      />
      <FavouritesStack.Screen
        name="CharacterDetail"
        component={CharacterDetail}
        options={{ title: 'Character' }}
      />
    </FavouritesStack.Navigator>
  );
}
