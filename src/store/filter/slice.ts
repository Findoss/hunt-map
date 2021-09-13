import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

import type { PayloadAction } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      if (!state.view.filters) {
        state.view.filters = [];
      }
      state.view.filters.push(action.payload);
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const newFilters = state.view.filters.filter((v) => v !== action.payload);
      state.view.filters = newFilters;
    },
  },
});
