import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import type { PayloadAction } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      state.view.filters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.view.filters.filter((v) => v !== action.payload);
    },
  },
});
