import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Coords } from './types';

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<Coords>) => {
      state.view.center = action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.view.zoom = action.payload;
    },
  },
});
