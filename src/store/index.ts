import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './slices/favouritesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
