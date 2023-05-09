import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLangs = createAsyncThunk('lang/fetchLangs', async () => {
  const response = await fetch(`/locales/langs.json`);
  const jsonData = await response.json();
  return jsonData;
});
