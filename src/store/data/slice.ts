import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import { fetchContentMap } from './thunk';

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContentMap.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
