'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import type { Product } from '@/types/product';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: (id: string | number) => Promise<void>;
  isDeleting?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  product,
  onConfirm,
  isDeleting = false,
}) => {
  const t = useTranslations('deleteProduct');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!product) return null;

  const handleClose = () => {
    setErrorMessage(null);
    onClose();
  };

  const handleConfirm = async () => {
    try {
      setErrorMessage(null);
      await onConfirm(product.id);
      handleClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 500) {
          setErrorMessage(
            t('serverError')
          );
          return;
        }
        setErrorMessage(
          error.response?.data?.message ||
            t('statusError', { status: status ?? '' })
        );
        return;
      }
      setErrorMessage(t('unexpectedError'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('title')}
      maxWidth="sm"
    >
      <div className="space-y-4 font-roboto">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-full bg-[#CC2E30]/10 text-[#CC2E30] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#1B2129] dark:text-[#F9F9FA]">
              {t('confirmation')}
            </p>
            <div className="mt-2 p-2.5 rounded-lg bg-[#F0F2F7] dark:bg-[#151A21] border border-gray-200 dark:border-gray-800 text-xs space-y-0.5">
              <p>
                <span className="font-semibold text-gray-500 dark:text-gray-400">
                  {t('id')}
                </span>{' '}
                {product.id}
              </p>
              <p>
                <span className="font-semibold text-gray-500 dark:text-gray-400">
                  {t('name')}
                </span>{' '}
                {product.name}
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t('permanent')}
            </p>
          </div>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div
            role="alert"
            className="p-3 rounded-lg bg-[#CC2E30]/10 border border-[#CC2E30]/30 text-xs font-medium text-[#CC2E30]"
          >
            {errorMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800/80">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
          >
            {t('no')}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            isLoading={isDeleting}
          >
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
