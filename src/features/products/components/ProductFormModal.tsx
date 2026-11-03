'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import {
  getProductSchema,
  type ProductFormData,
} from '../schemas/productSchema';
import type { Product } from '@/types/product';

export interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const t = useTranslations('productForm');
  const schema = getProductSchema(t);
  const isEditing = !!initialData;
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    values: initialData
      ? {
          name: initialData.name,
          price: Number(initialData.price),
          quantity: Number(initialData.quantity),
          category: initialData.category,
        }
      : {
          name: '',
          price: 0,
          quantity: 1,
          category: '',
        },
  });

  const handleClose = () => {
    setServerError(null);
    onClose();
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      setServerError(null);
      await onSubmit(data);
      handleClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : t('saveError');
      setServerError(message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? t('editTitle') : t('createTitle')}
      description={
        isEditing
          ? t('editDescription')
          : t('createDescription')
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {serverError && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-[#CC2E30]/10 border border-[#CC2E30]/30 text-xs font-medium text-[#CC2E30]"
          >
            {serverError}
          </div>
        )}

        {/* Nome */}
        <Input
          label={t('nameLabel')}
          placeholder={t('namePlaceholder')}
          error={errors.name?.message}
          disabled={isSubmitting}
          {...register('name')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Preço */}
          <Input
            label={t('priceLabel')}
            type="number"
            step="0.01"
            placeholder={t('pricePlaceholder')}
            error={errors.price?.message}
            disabled={isSubmitting}
            {...register('price', { valueAsNumber: true })}
          />

          {/* Quantidade */}
          <Input
            label={t('quantityLabel')}
            type="number"
            step="1"
            placeholder={t('quantityPlaceholder')}
            error={errors.quantity?.message}
            disabled={isSubmitting}
            {...register('quantity', { valueAsNumber: true })}
          />
        </div>

        {/* Categoria */}
        <Input
          label={t('categoryLabel')}
          placeholder={t('categoryPlaceholder')}
          error={errors.category?.message}
          disabled={isSubmitting}
          {...register('category')}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800/80">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t('cancel')}
          </Button>

          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isEditing ? t('update') : t('save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
