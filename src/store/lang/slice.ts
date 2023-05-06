import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangList, initialState } from './state';
import { fetchLangs } from './thunk';

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLangs.fulfilled, (state, action) => {
      state.supportedLangs = action.payload;
    });
  },
});
