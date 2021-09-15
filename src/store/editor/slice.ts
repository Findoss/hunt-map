import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

import { addMarker } from './thunk';

import type { PayloadAction } from '@reduxjs/toolkit';

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEdit: (state, action: PayloadAction<string>) => {
      const newMode = action.payload;
      if (state.edit !== newMode) {
        state.edit = newMode;
      } else {
        state.edit = '';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMarker.fulfilled, (state) => {
      state.isLoadModule = false;
    });
  },
});
