'use client';

import React from 'react';
import { Pencil, Trash2, PackageOpen } from 'lucide-react';
import { formatCurrencyBRL } from '@/utils/formatters';
import type { Product } from '@/types/product';

export interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="w-full bg-[#FEFEFE] dark:bg-[#1B2129] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs">
        <div className="p-6 space-y-3 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-full" />
          <div className="h-10 bg-gray-100 dark:bg-gray-800/60 rounded-md w-full" />
          <div className="h-10 bg-gray-100 dark:bg-gray-800/60 rounded-md w-full" />
          <div className="h-10 bg-gray-100 dark:bg-gray-800/60 rounded-md w-full" />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full bg-[#FEFEFE] dark:bg-[#1B2129] rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-xs">
        <div className="inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-3">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="font-poppins font-bold text-base text-[#1B2129] dark:text-[#F9F9FA]">
          Nenhum produto encontrado
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
          Não localizamos registros com os critérios informados ou nenhum produto foi cadastrado ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FEFEFE] dark:bg-[#1B2129] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs font-roboto">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F0F2F7] dark:bg-[#151A21] border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider font-poppins">
              <th scope="col" className="px-6 py-3.5">
                ID
              </th>
              <th scope="col" className="px-6 py-3.5">
                Nome
              </th>
              <th scope="col" className="px-6 py-3.5">
                Categoria
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Preço
              </th>
              <th scope="col" className="px-6 py-3.5 text-center">
                Quantidade
              </th>
              <th scope="col" className="px-6 py-3.5 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 text-sm">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-[#151A21]/50 transition-colors"
              >
                {/* ID */}
                <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                  #{product.id}
                </td>

                {/* Nome */}
                <td className="px-6 py-4 font-semibold text-[#1B2129] dark:text-[#F9F9FA]">
                  {product.name}
                </td>

                {/* Categoria */}
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0F2F7] dark:bg-gray-800 text-[#3E63AC] dark:text-[#6085FF]">
                    {product.category}
                  </span>
                </td>

                {/* Preço (BRL) */}
                <td className="px-6 py-4 text-right font-medium text-[#1B2129] dark:text-[#F9F9FA]">
                  {formatCurrencyBRL(product.price)}
                </td>

                {/* Quantidade */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
                      product.quantity <= 3
                        ? 'bg-[#CC2E30]/10 text-[#CC2E30]'
                        : 'bg-[#218F4E]/10 text-[#218F4E]'
                    }`}
                  >
                    {product.quantity} un
                  </span>
                </td>

                {/* Ações */}
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Editar */}
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      aria-label={`Editar ${product.name}`}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#3E63AC] dark:text-gray-400 dark:hover:text-[#6085FF] hover:bg-[#F0F2F7] dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Remover */}
                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      aria-label={`Remover ${product.name}`}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#CC2E30] dark:text-gray-400 dark:hover:text-[#CC2E30] hover:bg-[#CC2E30]/10 transition-colors cursor-pointer"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
