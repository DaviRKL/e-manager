import { beforeEach, describe, it, expect, vi } from 'vitest';
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '../../../messages/pt-br.json';
import { getProductSchema } from './schemas/productSchema';
import { ProductTable } from './components/ProductTable';
import { ProductFormModal } from './components/ProductFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ProductsPageContent } from './ProductsPageContent';
import { useProducts } from '@/hooks/useProducts';
import { formatCurrencyBRL } from '@/utils/formatters';
import type { Product } from '@/types/product';

vi.mock('@/components/layout', () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@/hooks/useProducts', () => ({
  useProducts: vi.fn(),
}));

function render(ui: React.ReactElement) {
  return rtlRender(
    <NextIntlClientProvider locale="pt-br" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('Product Feature Tests', () => {
  describe('Products pagination', () => {
    const products: Product[] = Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      name: `Product ${String(index + 1).padStart(2, '0')}`,
      price: 10 + index,
      quantity: 5,
      category: 'Test',
      created_at: '',
    }));

    beforeEach(() => {
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
      });
    });

    it('shows ten products per page and advances to the next page', () => {
      render(<ProductsPageContent />);

      expect(screen.getAllByRole('row')).toHaveLength(11);
      expect(screen.getByText('Product 01')).toBeInTheDocument();
      expect(screen.getByText('Product 10')).toBeInTheDocument();
      expect(screen.queryByText('Product 11')).not.toBeInTheDocument();
      expect(screen.getByText('Página 1 de 3')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();

      fireEvent.click(screen.getByRole('button', { name: 'Próximo' }));

      expect(screen.getAllByRole('row')).toHaveLength(11);
      expect(screen.queryByText('Product 01')).not.toBeInTheDocument();
      expect(screen.getByText('Product 11')).toBeInTheDocument();
      expect(screen.getByText('Product 20')).toBeInTheDocument();
      expect(screen.getByText('Página 2 de 3')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Anterior' })).toBeEnabled();
    });

    it('resets to the first page when the search term changes', () => {
      render(<ProductsPageContent />);

      fireEvent.click(screen.getByRole('button', { name: 'Próximo' }));
      expect(screen.getByText('Página 2 de 3')).toBeInTheDocument();

      fireEvent.change(
        screen.getByRole('searchbox', { name: 'Barra de pesquisa de produtos' }),
        { target: { value: 'Product 02' } }
      );

      expect(screen.getByText('Página 1 de 1')).toBeInTheDocument();
      expect(screen.getByText('Product 02')).toBeInTheDocument();
      expect(screen.queryByText('Product 12')).not.toBeInTheDocument();
    });
  });

  describe('Zod productSchema Validation', () => {
    const productSchema = getProductSchema((key) => key);

    it('accepts valid product form data', () => {
      const valid = {
        name: 'Notebook Dell Inspiron',
        price: 3499.9,
        quantity: 5,
        category: 'Informática',
      };
      const result = productSchema.safeParse(valid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.price).toBe(3499.9);
        expect(result.data.quantity).toBe(5);
      }
    });

    it('rejects name with less than 3 characters', () => {
      const invalid = {
        name: 'Oi',
        price: 100,
        quantity: 1,
        category: 'Geral',
      };
      const result = productSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('validation.nameMin');
      }
    });

    it('rejects negative or zero price', () => {
      const invalid = {
        name: 'Monitor',
        price: -50,
        quantity: 1,
        category: 'Geral',
      };
      const result = productSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('rejects non-integer quantity or negative quantity', () => {
      const nonInt = {
        name: 'Mouse',
        price: 80,
        quantity: 2.5,
        category: 'Periféricos',
      };
      const result = productSchema.safeParse(nonInt);
      expect(result.success).toBe(false);
    });

    it('rejects empty category', () => {
      const invalid = {
        name: 'Mousepad',
        price: 49.9,
        quantity: 10,
        category: '   ',
      };
      const result = productSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('formatCurrencyBRL', () => {
    it('formats number to Brazilian Real currency format', () => {
      const formatted = formatCurrencyBRL(1250.5);
      // Normalized check: contains R$ and 1.250,50
      expect(formatted).toContain('R$');
      expect(formatted).toContain('1.250,50');
    });
  });

  describe('ProductTable component', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Teclado Gamer',
        price: 250,
        quantity: 12,
        category: 'Periféricos',
        created_at: '2026-11-03T12:00:00Z',
      },
    ];

    it('renders table columns and formatted BRL price', () => {
      render(
        <ProductTable
          products={mockProducts}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('Teclado Gamer')).toBeInTheDocument();
      expect(screen.getByText('Periféricos')).toBeInTheDocument();
      expect(screen.getByText(/250,00/)).toBeInTheDocument();
      expect(screen.getByText('12 un')).toBeInTheDocument();
    });

    it('calls onEdit and onDelete when respective action buttons are clicked', () => {
      const handleEdit = vi.fn();
      const handleDelete = vi.fn();

      render(
        <ProductTable
          products={mockProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );

      const editBtn = screen.getByRole('button', {
        name: /editar teclado gamer/i,
      });
      fireEvent.click(editBtn);
      expect(handleEdit).toHaveBeenCalledWith(mockProducts[0]);

      const deleteBtn = screen.getByRole('button', {
        name: /remover teclado gamer/i,
      });
      fireEvent.click(deleteBtn);
      expect(handleDelete).toHaveBeenCalledWith(mockProducts[0]);
    });
  });

  describe('ProductFormModal component', () => {
    it('submits form with validated data on create mode', async () => {
      const handleSubmit = vi.fn().mockResolvedValue(undefined);
      const handleClose = vi.fn();

      render(
        <ProductFormModal
          isOpen={true}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      );

      fireEvent.change(screen.getByLabelText(/nome do produto/i), {
        target: { value: 'Headset Wireless' },
      });
      fireEvent.change(screen.getByLabelText(/preço/i), {
        target: { value: '499.90' },
      });
      fireEvent.change(screen.getByLabelText(/quantidade/i), {
        target: { value: '8' },
      });
      fireEvent.change(screen.getByLabelText(/categoria/i), {
        target: { value: 'Áudio' },
      });

      const submitBtn = screen.getByRole('button', { name: /salvar produto/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          name: 'Headset Wireless',
          price: 499.9,
          quantity: 8,
          category: 'Áudio',
        });
      });
    });
  });

  describe('DeleteConfirmModal component', () => {
    const mockProduct: Product = {
      id: 42,
      name: 'Placa de Vídeo RTX 4070',
      price: 4200,
      quantity: 3,
      category: 'Hardware',
      created_at: '2026-11-03T12:00:00Z',
    };

    it('renders confirmation text with product details', () => {
      render(
        <DeleteConfirmModal
          isOpen={true}
          onClose={vi.fn()}
          product={mockProduct}
          onConfirm={vi.fn()}
        />
      );

      expect(
        screen.getByText('Você tem certeza que deseja remover esse produto?')
      ).toBeInTheDocument();
      expect(screen.getByText('Placa de Vídeo RTX 4070')).toBeInTheDocument();
    });

    it('calls onConfirm when Sim is clicked', async () => {
      const handleConfirm = vi.fn().mockResolvedValue(undefined);
      render(
        <DeleteConfirmModal
          isOpen={true}
          onClose={vi.fn()}
          product={mockProduct}
          onConfirm={handleConfirm}
        />
      );

      const simBtn = screen.getByRole('button', { name: /sim/i });
      fireEvent.click(simBtn);

      expect(handleConfirm).toHaveBeenCalledWith(42);
    });

    it('displays server 500 error message when deletion fails', async () => {
      const axiosError = {
        isAxiosError: true,
        response: { status: 500, data: { message: 'Internal Server Error' } },
      };
      const handleConfirm = vi.fn().mockRejectedValue(axiosError);

      render(
        <DeleteConfirmModal
          isOpen={true}
          onClose={vi.fn()}
          product={mockProduct}
          onConfirm={handleConfirm}
        />
      );

      const simBtn = screen.getByRole('button', { name: /sim/i });
      fireEvent.click(simBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/erro interno no servidor \(500\)/i)
        ).toBeInTheDocument();
      });
    });
  });
});
