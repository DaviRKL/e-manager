import { describe, it, expect } from 'vitest';
import uiReducer, { setTheme, toggleTheme, type UiState } from './uiSlice';

describe('uiSlice', () => {
  const initialState: UiState = {
    theme: 'light',
  };

  it('should handle initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual({ theme: 'light' });
  });

  it('should handle toggleTheme from light to dark and back', () => {
    const state1 = uiReducer(initialState, toggleTheme());
    expect(state1.theme).toBe('dark');

    const state2 = uiReducer(state1, toggleTheme());
    expect(state2.theme).toBe('light');
  });

  it('should handle setTheme to specific mode', () => {
    const actual = uiReducer(initialState, setTheme('dark'));
    expect(actual.theme).toBe('dark');
  });
});
