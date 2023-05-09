import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContentMap = createAsyncThunk('data/fetchContentMap', async (id: string) => {
  const response = await fetch(`/maps/${id}/data.json`);
  const jsonData = await response.json();
  return jsonData;
});
