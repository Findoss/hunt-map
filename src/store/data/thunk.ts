import { createAsyncThunk } from '@reduxjs/toolkit';
import { PUBLIC_URL } from 'constants/index';

export const fetchContentMap = createAsyncThunk('data/fetchContentMap', async (id: string) => {
  const response = await fetch(`${PUBLIC_URL}/maps/${id}/data.json`);
  const jsonData = await response.json();
  return jsonData;
});
