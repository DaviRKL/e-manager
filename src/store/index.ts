import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { uiSlice } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { uiSlice };
export * from './slices/uiSlice';
export * from './hooks';
