import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import dashboardReducer from '@/store/slices/dashboardSlice';
import uiReducer from '@/store/slices/uiSlice';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/product';
import { DashboardContent } from './DashboardContent';

vi.mock('@/components/layout', () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@/hooks/useProducts', () => ({
  useProducts: vi.fn(),
}));

const products: Product[] = [
  {
    id: 1,
    name: 'Produto A',
    price: 100,
    quantity: 10,
    category: 'Geral',
    created_at: '',
  },
  {
    id: 2,
    name: 'Produto B',
    price: 700,
    quantity: 2,
    category: 'Geral',
    created_at: '',
  },
  {
    id: 3,
    name: 'Produto C',
    price: 200,
    quantity: 0,
    category: 'Geral',
    created_at: '',
  },
  {
    id: 4,
    name: 'Produto D',
    price: 500,
    quantity: 20,
    category: 'Geral',
    created_at: '',
  },
  {
    id: 5,
    name: 'Produto E',
    price: 300,
    quantity: 7,
    category: 'Geral',
    created_at: '',
  },
  {
    id: 6,
    name: 'Produto F',
    price: 600,
    quantity: 30,
    category: 'Geral',
    created_at: '',
  },
  {
    id: 7,
    name: 'Produto G',
    price: 400,
    quantity: 50,
    category: 'Geral',
    created_at: '',
  },
];

function mockProducts(
  overrides: Partial<ReturnType<typeof useProducts>> = {}
) {
  vi.mocked(useProducts).mockReturnValue({
    products,
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
    createMutation: {} as ReturnType<typeof useProducts>['createMutation'],
    updateMutation: {} as ReturnType<typeof useProducts>['updateMutation'],
    deleteMutation: {} as ReturnType<typeof useProducts>['deleteMutation'],
    ...overrides,
  });
}

function renderDashboard() {
  const store = configureStore({
    reducer: {
      dashboard: dashboardReducer,
      ui: uiReducer,
    },
  });

  render(
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );

  return store;
}

describe('DashboardContent', () => {
  beforeEach(() => {
    mockProducts();
  });

  it('lists low-stock products using the default threshold and totals all products', () => {
    renderDashboard();

    const stockCard = screen
      .getByRole('heading', { name: 'Produtos com estoque baixo' })
      .closest('article');
    expect(stockCard).not.toBeNull();
    expect(within(stockCard!).getByText('Produto A')).toBeInTheDocument();
    expect(within(stockCard!).getByText('Produto B')).toBeInTheDocument();
    expect(within(stockCard!).getByText('Produto E')).toBeInTheDocument();
    expect(within(stockCard!).queryByText('Produto D')).not.toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('Produtos adicionados')).toBeInTheDocument();
  });

  it('updates the threshold in Redux and filters stock levels immediately', () => {
    const store = renderDashboard();

    fireEvent.change(screen.getByLabelText('Definir limite de estoque baixo'), {
      target: { value: '3' },
    });

    expect(store.getState().dashboard.lowStockThreshold).toBe(3);
    const stockCard = screen
      .getByRole('heading', { name: 'Produtos com estoque baixo' })
      .closest('article');
    expect(stockCard).not.toBeNull();
    expect(within(stockCard!).getByText('Produto B')).toBeInTheDocument();
    expect(within(stockCard!).getByText('Produto C')).toBeInTheDocument();
    expect(within(stockCard!).queryByText('Produto A')).not.toBeInTheDocument();
  });

  it('shows the five most expensive products in descending price order', () => {
    renderDashboard();

    const productsCard = screen
      .getByRole('heading', { name: 'Produtos mais caros' })
      .closest('article');
    expect(productsCard).not.toBeNull();
    const listedProducts = within(productsCard!)
      .getAllByRole('listitem')
      .map((item) => item.textContent);

    expect(listedProducts).toEqual([
      expect.stringContaining('Produto B'),
      expect.stringContaining('Produto F'),
      expect.stringContaining('Produto D'),
      expect.stringContaining('Produto G'),
      expect.stringContaining('Produto E'),
    ]);
  });

  it('shows loading and error feedback while products are unavailable', () => {
    mockProducts({ isLoading: true });
    const { unmount } = render(
      <Provider
        store={configureStore({
          reducer: { dashboard: dashboardReducer, ui: uiReducer },
        })}
      >
        <DashboardContent />
      </Provider>
    );
    expect(screen.getAllByText('Carregando produtos...')).toHaveLength(3);

    unmount();
    mockProducts({ isError: true, error: new Error('Backend indisponível') });
    renderDashboard();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Backend indisponível'
    );
    expect(
      screen.getByText('Total de produtos indisponível.')
    ).toBeInTheDocument();
  });
});
