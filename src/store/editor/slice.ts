import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

import { addMarker } from './thunk';

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addMarker.fulfilled, (state) => {
      state.isLoadModule = false;
    });
  },
});
