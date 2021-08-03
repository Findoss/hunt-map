import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';
import type { PayloadAction } from '@reduxjs/toolkit';

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});
