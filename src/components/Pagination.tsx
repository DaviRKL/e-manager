'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations('pagination');
  const displayedTotalPages = Math.max(totalPages, 1);
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = totalPages === 0 || currentPage >= totalPages;
  const buttonClassName =
    'inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-[#1B2129] transition-colors hover:bg-[#F0F2F7] focus:outline-none focus:ring-2 focus:ring-[#6085FF] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-[#F9F9FA] dark:hover:bg-[#151A21]';

  return (
    <nav
      aria-label={t('navigationLabel')}
      className="flex items-center justify-between gap-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPreviousDisabled}
        className={buttonClassName}
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        {t('previous')}
      </button>
      <span
        aria-live="polite"
        className="text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        {t('pageIndicator', {
          current: currentPage,
          total: displayedTotalPages,
        })}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className={buttonClassName}
      >
        {t('next')}
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </nav>
  );
}

export default Pagination;
