'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  showCloseButton = true,
}) => {
  const t = useTranslations('common');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${maxWidthClasses[maxWidth]} bg-[#FEFEFE] dark:bg-[#1B2129] text-[#1B2129] dark:text-[#F9F9FA] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden transform transition-all duration-200 animate-in fade-in zoom-in-95`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800/80">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-poppins font-bold text-lg leading-tight text-[#1B2129] dark:text-[#F9F9FA]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label={t('close')}
                className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B2129] dark:hover:text-[#F9F9FA] hover:bg-[#F0F2F7] dark:hover:bg-[#151A21] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 font-roboto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
