import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { mapSlice } from './map/slice';
import { filtersSlice } from './filters/slice';

export const store = configureStore({
  reducer: {
    map: mapSlice.reducer,
    filters: filtersSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
