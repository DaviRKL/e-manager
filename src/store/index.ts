import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { uiSlice } from './slices/uiSlice';
import dashboardReducer, { dashboardSlice } from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { uiSlice };
export { dashboardSlice };
export * from './slices/uiSlice';
export * from './slices/dashboardSlice';
export * from './hooks';
