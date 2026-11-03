import { describe, expect, it } from 'vitest';
import dashboardReducer, {
  setLowStockThreshold,
  type DashboardState,
} from './dashboardSlice';

describe('dashboardSlice', () => {
  const initialState: DashboardState = {
    lowStockThreshold: 10,
  };

  it('uses 10 as the default low-stock threshold', () => {
    expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('updates the low-stock threshold to a non-negative integer', () => {
    expect(dashboardReducer(initialState, setLowStockThreshold(4))).toEqual({
      lowStockThreshold: 4,
    });
  });

  it('ignores a negative or fractional low-stock threshold', () => {
    expect(
      dashboardReducer(initialState, setLowStockThreshold(-1))
    ).toEqual(initialState);
    expect(
      dashboardReducer(initialState, setLowStockThreshold(1.5))
    ).toEqual(initialState);
  });
});
