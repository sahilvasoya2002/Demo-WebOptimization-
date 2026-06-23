export type CharactersStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { id: number };
};

export type EpisodesStackParamList = {
  Episodes: undefined;
};

export type LocationsStackParamList = {
  Locations: undefined;
  LocationDetail: { locationId: number };
};

export type FavouritesStackParamList = {
  Favourites: undefined;
  CharacterDetail: { id: number };
};

export type RootTabParamList = {
  CharactersTab: undefined;
  EpisodesTab: undefined;
  LocationsTab: undefined;
  FavouritesTab: undefined;
};
