import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState {
  lowStockThreshold: number;
}

const initialState: DashboardState = {
  lowStockThreshold: 10,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLowStockThreshold: (state, action: PayloadAction<number>) => {
      if (Number.isSafeInteger(action.payload) && action.payload >= 0) {
        state.lowStockThreshold = action.payload;
      }
    },
  },
});

export const { setLowStockThreshold } = dashboardSlice.actions;
export default dashboardSlice.reducer;
