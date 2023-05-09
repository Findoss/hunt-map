import { createAsyncThunk } from '@reduxjs/toolkit';
import { PUBLIC_URL } from 'constants/index';

export const fetchMaps = createAsyncThunk('map/fetchMaps', async () => {
  const response = await fetch(`${PUBLIC_URL}/maps/maps.json`);
  const jsonData = await response.json();
  return jsonData;
});
