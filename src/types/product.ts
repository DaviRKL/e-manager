export interface Product {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  created_at: string;
}

export interface RawProduct {
  id: string | number;
  name: string;
  price: string | number;
  quantity: number;
  category: string;
  created_at: string;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface UpdateProductDTO {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface UpdateProductPayload {
  id: string | number;
  data: UpdateProductDTO;
}
