import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from './map/slice';
import { filterSlice } from './filter/slice';
import { langSlice } from './lang/slice';
import { dataSlice } from './data/slice';

import { loggerMiddleware } from './middleware/log';
import { urlMiddleware } from './middleware/url';

import type { ThunkAction, Action } from '@reduxjs/toolkit';

const middlewares = [loggerMiddleware, urlMiddleware];

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    lang: langSlice.reducer,
    map: mapSlice.reducer,
    filters: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
