import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFormatPrice } from './useFormatPrice';

describe('useFormatPrice hook', () => {
  it('formats positive number to BRL currency format', () => {
    const { result } = renderHook(() => useFormatPrice());
    const formatted = result.current.formatPrice(100);

    expect(formatted).toContain('R$');
    expect(formatted).toContain('100,00');
  });

  it('formats decimal value with comma and dots as BRL standard', () => {
    const { result } = renderHook(() => useFormatPrice());
    const formatted = result.current.formatPrice(2450.75);

    expect(formatted).toContain('R$');
    expect(formatted).toContain('2.450,75');
  });

  it('formats string representation of a number to BRL', () => {
    const { result } = renderHook(() => useFormatPrice());
    const formatted = result.current.formatPrice('89.90');

    expect(formatted).toContain('R$');
    expect(formatted).toContain('89,90');
  });

  it('formats zero correctly', () => {
    const { result } = renderHook(() => useFormatPrice());
    const formatted = result.current.formatPrice(0);

    expect(formatted).toContain('R$');
    expect(formatted).toContain('0,00');
  });

  it('returns default fallback when given NaN or invalid string', () => {
    const { result } = renderHook(() => useFormatPrice());
    const formatted = result.current.formatPrice('invalid_value');

    expect(formatted).toBe('R$ 0,00');
  });
});
