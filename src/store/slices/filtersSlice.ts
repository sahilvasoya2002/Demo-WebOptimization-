import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CharacterGender, CharacterStatus } from '../../types/api';

export interface FiltersState {
  searchQuery: string;
  status: CharacterStatus | '';
  gender: CharacterGender | '';
}

const initialState: FiltersState = {
  searchQuery: '',
  status: '',
  gender: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setStatus(state, action: PayloadAction<CharacterStatus | ''>) {
      state.status = action.payload;
    },
    setGender(state, action: PayloadAction<CharacterGender | ''>) {
      state.gender = action.payload;
    },
    clearFilters(state) {
      state.status = '';
      state.gender = '';
    },
  },
});

export const { setSearchQuery, setStatus, setGender, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
