import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, Theme } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { brutal } from '../theme/brutal';
import { typography, weights } from '../theme/typography';
import { MS } from '../utils/responsive';
import type { RootTabParamList } from './types';
import {
  CharactersStackNavigator,
  EpisodesStackNavigator,
  LocationsStackNavigator,
  FavouritesStackNavigator,
} from './Stacks';
import {
  CharactersIcon,
  EpisodesIcon,
  LocationsIcon,
  FavouritesIcon,
} from './TabIcons';

const Tab = createBottomTabNavigator<RootTabParamList>();

const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.accent,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: brutal.borderColor,
    notification: colors.accent,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

/**
 * AppNavigator Component
 * Main bottom tab navigator. Displays Characters, Episodes, Locations, and Favourites.
 */
export function AppNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="CharactersTab"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: brutal.borderWidth,
            borderTopColor: brutal.borderColor,
            height: MS(64) + insets.bottom,
            paddingTop: MS(6),
            paddingBottom: MS(8) + insets.bottom,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textSubtle,
          tabBarLabelStyle: {
            ...typography.tabLabel,
            fontWeight: weights.bold,
          },
        }}>
        <Tab.Screen
          name="CharactersTab"
          component={CharactersStackNavigator}
          options={{
            tabBarLabel: 'Characters',
            tabBarIcon: CharactersIcon,
          }}
        />
        <Tab.Screen
          name="EpisodesTab"
          component={EpisodesStackNavigator}
          options={{
            tabBarLabel: 'Episodes',
            tabBarIcon: EpisodesIcon,
          }}
        />
        <Tab.Screen
          name="LocationsTab"
          component={LocationsStackNavigator}
          options={{
            tabBarLabel: 'Locations',
            tabBarIcon: LocationsIcon,
          }}
        />
        <Tab.Screen
          name="FavouritesTab"
          component={FavouritesStackNavigator}
          options={{
            tabBarLabel: 'Favourites',
            tabBarIcon: FavouritesIcon,
            tabBarActiveTintColor: colors.favourite,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
