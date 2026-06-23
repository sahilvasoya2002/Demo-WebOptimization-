import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addFavourite,
  getFavourites,
  initDB,
  removeFavourite,
} from '../../db/database';
import type { FavouriteRow } from '../../types/api';

// calling here to Make sure the table is created before loading favourites.
initDB();

export interface FavouritesState {
  items: FavouriteRow[];
}

const initialState: FavouritesState = {
  items: getFavourites(),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<FavouriteRow>) {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (!exists) {
        addFavourite(action.payload);
        state.items.push(action.payload);
      }
    },
    removeFromFavourites(state, action: PayloadAction<number>) {
      removeFavourite(action.payload);
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;

interface FavouritesRootSlice {
  favourites: FavouritesState;
}

export const selectFavouriteItems = (state: FavouritesRootSlice): FavouriteRow[] =>
  state.favourites.items;

export const makeSelectIsFavourite = (id: number) =>
  createSelector([selectFavouriteItems], items =>
    items.some(item => item.id === id),
  );

export default favouritesSlice.reducer;
