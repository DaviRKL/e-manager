import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useProducts } from './useProducts';
import { productService } from '@/services/productService';

vi.mock('@/services/productService', () => ({
  productService: {
    getProducts: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  QueryWrapper.displayName = 'QueryWrapper';
  return QueryWrapper;
}

describe('useProducts hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches products and returns normalized list', async () => {
    vi.mocked(productService.getProducts).mockResolvedValueOnce([
      {
        id: 1,
        name: 'Monitor UltraWide',
        price: 1850,
        quantity: 8,
        category: 'Monitores',
        created_at: '2026-11-03T12:00:00Z',
      },
    ]);

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe('Monitor UltraWide');
    expect(result.current.products[0].price).toBe(1850);
  });
});
