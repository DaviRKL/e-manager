import api from './api';
import type {
  Product,
  RawProduct,
  CreateProductDTO,
  UpdateProductDTO,
  UpdateProductPayload,
} from '@/types/product';

export const normalizeProduct = (raw: RawProduct): Product => ({
  ...raw,
  price: Number(raw.price),
});

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<RawProduct[]>('/products/');
    return response.data.map(normalizeProduct);
  },

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    const payload = {
      name: dto.name,
      price: Number(dto.price),
      quantity: Number(dto.quantity),
      category: dto.category,
    };
    const response = await api.post<RawProduct>('/products/', payload);
    return normalizeProduct(response.data);
  },

  async updateProduct({ id, data }: UpdateProductPayload): Promise<Product> {
    const payload: UpdateProductDTO = {
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
      category: data.category,
    };
    const response = await api.put<RawProduct>(`/products/${id}`, payload);
    return normalizeProduct(response.data);
  },

  async deleteProduct(id: string | number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export default productService;
