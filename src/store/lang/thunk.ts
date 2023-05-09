import { createAsyncThunk } from '@reduxjs/toolkit';
import { PUBLIC_URL } from 'constants/index';

export const fetchLangs = createAsyncThunk('lang/fetchLangs', async () => {
  const response = await fetch(`${PUBLIC_URL}/locales/langs.json`);
  const jsonData = await response.json();
  return jsonData;
});
