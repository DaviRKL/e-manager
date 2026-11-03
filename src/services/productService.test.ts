import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from './api';
import productService, { normalizeProduct } from './productService';

vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('normalizes string/decimal price to number', () => {
    const raw = {
      id: 1,
      name: 'Notebook',
      price: '3499.99',
      quantity: 5,
      category: 'Informática',
      created_at: '2026-11-03T12:00:00Z',
    };
    const normalized = normalizeProduct(raw);
    expect(typeof normalized.price).toBe('number');
    expect(normalized.price).toBe(3499.99);
  });

  it('getProducts fetches from /products/ and normalizes prices', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: 'Teclado',
          price: '199.90',
          quantity: 10,
          category: 'Periféricos',
          created_at: '2026-11-03T12:00:00Z',
        },
      ],
    });

    const products = await productService.getProducts();
    expect(api.get).toHaveBeenCalledWith('/products/');
    expect(products).toHaveLength(1);
    expect(products[0].price).toBe(199.9);
  });

  it('createProduct sends POST to /products/ with numeric price', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({
      data: {
        id: 2,
        name: 'Mouse',
        price: '99.50',
        quantity: 20,
        category: 'Periféricos',
        created_at: '2026-11-03T12:00:00Z',
      },
    });

    const result = await productService.createProduct({
      name: 'Mouse',
      price: 99.5,
      quantity: 20,
      category: 'Periféricos',
    });

    expect(api.post).toHaveBeenCalledWith('/products/', {
      name: 'Mouse',
      price: 99.5,
      quantity: 20,
      category: 'Periféricos',
    });
    expect(result.price).toBe(99.5);
  });

  it('updateProduct sends PUT to /products/:id with all required fields', async () => {
    vi.mocked(api.put).mockResolvedValueOnce({
      data: {
        id: 2,
        name: 'Mouse Gamer',
        price: '129.90',
        quantity: 15,
        category: 'Periféricos',
        created_at: '2026-11-03T12:00:00Z',
      },
    });

    const result = await productService.updateProduct({
      id: 2,
      data: {
        name: 'Mouse Gamer',
        price: 129.9,
        quantity: 15,
        category: 'Periféricos',
      },
    });

    expect(api.put).toHaveBeenCalledWith('/products/2', {
      name: 'Mouse Gamer',
      price: 129.9,
      quantity: 15,
      category: 'Periféricos',
    });
    expect(result.name).toBe('Mouse Gamer');
  });

  it('deleteProduct sends DELETE to /products/:id', async () => {
    vi.mocked(api.delete).mockResolvedValueOnce({ data: {} });

    await productService.deleteProduct(2);
    expect(api.delete).toHaveBeenCalledWith('/products/2');
  });
});
