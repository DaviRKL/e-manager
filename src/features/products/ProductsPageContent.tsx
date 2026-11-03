'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { AppLayout } from '@/components/layout';
import { useProducts } from '@/hooks/useProducts';
import {
  ProductTable,
  ProductFormModal,
  DeleteConfirmModal,
} from './components';
import type { Product } from '@/types/product';
import type { ProductFormData } from './schemas/productSchema';

export const ProductsPageContent: React.FC = () => {
  const {
    products,
    isLoading,
    isError,
    error,
    getProducts,
    createProduct,
    isCreating,
    updateProduct,
    isUpdating,
    deleteProduct,
    isDeleting,
  } = useProducts();

  // Search filter state
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Client-side filtering
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        String(product.id).toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Modal actions
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await createProduct(data);
    }
  };

  const handleConfirmDelete = async (id: string | number) => {
    await deleteProduct(id);
  };

  return (
    <AppLayout
      title="Produtos"
      subtitle="Gerenciamento de estoque e catálogo em tempo real"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Controls Bar: Search & Action Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#FEFEFE] dark:bg-[#1B2129] p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
          {/* Search bar */}
          <div className="w-full sm:max-w-md">
            <Input
              type="search"
              placeholder="Pesquisar por nome, categoria ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              aria-label="Barra de pesquisa de produtos"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Button
              variant="outline"
              size="md"
              onClick={() => getProducts()}
              title="Recarregar lista"
              aria-label="Recarregar produtos"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={handleOpenCreate}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Novo Produto
            </Button>
          </div>
        </div>

        {/* Global Error Banner */}
        {isError && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-[#CC2E30]/10 border border-[#CC2E30]/30 text-sm text-[#CC2E30] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>
                Erro ao conectar ao backend:{' '}
                {error instanceof Error ? error.message : 'Falha na requisição'}.
                Verifique se o backend está ativo em http://localhost:8000.
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => getProducts()}
              className="text-[#CC2E30] border-[#CC2E30]"
            >
              Tentar Novamente
            </Button>
          </div>
        )}

        {/* Results Info & Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span>
              Exibindo {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              {searchTerm && ` para "${searchTerm}"`}
            </span>
          </div>

          <ProductTable
            products={filteredProducts}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            isLoading={isLoading}
          />
        </div>

        {/* Modals */}
        <ProductFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          isSubmitting={isCreating || isUpdating}
        />

        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          product={deletingProduct}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      </div>
    </AppLayout>
  );
};

export default ProductsPageContent;
