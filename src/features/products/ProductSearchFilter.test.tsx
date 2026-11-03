import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/pt-br.json';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@/store/slices/uiSlice';
import { ProductsPageContent } from './ProductsPageContent';
import * as productsHook from '@/hooks/useProducts';
import type { Product } from '@/types/product';

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }));

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  usePathname: () => '/pt-br/produtos',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock('@/i18n/routing', () => ({
  usePathname: () => '/produtos',
  useRouter: () => ({ replace }),
}));

const mockProductsList: Product[] = [
  {
    id: 1,
    name: 'Cadeira Ergonômica',
    category: 'Móveis',
    price: 350.0,
    quantity: 10,
    created_at: '2026-11-03T12:00:00Z',
  },
  {
    id: 2,
    name: 'Mesa de Reunião',
    category: 'Móveis',
    price: 890.0,
    quantity: 4,
    created_at: '2026-11-03T12:00:00Z',
  },
];

function renderWithStore(ui: React.ReactElement) {
  const testStore = configureStore({
    reducer: {
      ui: uiReducer,
    },
  });

  return render(
    <Provider store={testStore}>
      <NextIntlClientProvider locale="pt-br" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    </Provider>
  );
}

describe('Product Search Filter and Table Rendering', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(productsHook, 'useProducts').mockReturnValue({
      products: mockProductsList,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
      getProducts: vi.fn(),
      createProduct: vi.fn(),
      updateProduct: vi.fn(),
      deleteProduct: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
      createError: null,
      updateError: null,
      deleteError: null,
      createMutation:
        {} as unknown as ReturnType<typeof productsHook.useProducts>['createMutation'],
      updateMutation:
        {} as unknown as ReturnType<typeof productsHook.useProducts>['updateMutation'],
      deleteMutation:
        {} as unknown as ReturnType<typeof productsHook.useProducts>['deleteMutation'],
    });
  });

  it('renders products correctly from mock data', () => {
    renderWithStore(<ProductsPageContent />);

    // Check table headers
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
    expect(screen.getByText('Quantidade')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();

    // Check both initial products
    expect(screen.getByText('Cadeira Ergonômica')).toBeInTheDocument();
    expect(screen.getByText('Mesa de Reunião')).toBeInTheDocument();
    expect(screen.getByText(/350,00/)).toBeInTheDocument();
    expect(screen.getByText(/890,00/)).toBeInTheDocument();
  });

  it('filters list when searching: searching for "Mes" displays only "Mesa" and hides "Cadeira"', () => {
    renderWithStore(<ProductsPageContent />);

    // Initially both exist
    expect(screen.getByText('Cadeira Ergonômica')).toBeInTheDocument();
    expect(screen.getByText('Mesa de Reunião')).toBeInTheDocument();

    // Find search input
    const searchInput = screen.getByRole('searchbox', {
      name: /barra de pesquisa de produtos/i,
    });

    // Type "Mes"
    fireEvent.change(searchInput, { target: { value: 'Mes' } });

    // "Mesa de Reunião" should be visible
    expect(screen.getByText('Mesa de Reunião')).toBeInTheDocument();

    // "Cadeira Ergonômica" should NOT be visible
    expect(screen.queryByText('Cadeira Ergonômica')).not.toBeInTheDocument();
  });

  it('shows empty state when search term has no matches', () => {
    renderWithStore(<ProductsPageContent />);

    const searchInput = screen.getByRole('searchbox', {
      name: /barra de pesquisa de produtos/i,
    });

    fireEvent.change(searchInput, { target: { value: 'Geladeira' } });

    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
    expect(screen.queryByText('Cadeira Ergonômica')).not.toBeInTheDocument();
    expect(screen.queryByText('Mesa de Reunião')).not.toBeInTheDocument();
  });
});
