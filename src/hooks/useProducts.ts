import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import type {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  UpdateProductPayload,
} from '@/types/product';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useProducts() {
  const queryClient = useQueryClient();

  // Query: getProducts (GET /products/)
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => productService.getProducts(),
  });

  // Mutation: createProduct (POST /products/)
  const createMutation = useMutation({
    mutationFn: (dto: CreateProductDTO) => productService.createProduct(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  // Mutation: updateProduct (PUT /products/:id)
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdateProductPayload) =>
      productService.updateProduct({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  // Mutation: deleteProduct (DELETE /products/:id)
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });

  const updateProduct = (
    idOrPayload: string | number | UpdateProductPayload,
    data?: UpdateProductDTO
  ) => {
    if (typeof idOrPayload === 'object' && 'id' in idOrPayload) {
      return updateMutation.mutateAsync(idOrPayload);
    }
    return updateMutation.mutateAsync({
      id: idOrPayload as string | number,
      data: data as UpdateProductDTO,
    });
  };

  return {
    // Data & state
    products,
    isLoading,
    isFetching,
    isError,
    error,

    // Core functions
    getProducts: refetch,
    createProduct: createMutation.mutateAsync,
    updateProduct,
    deleteProduct: deleteMutation.mutateAsync,

    // Loading & error status
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,

    // Raw mutations & query
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export default useProducts;
