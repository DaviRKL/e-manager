'use client';

import { useMemo } from 'react';
import { AlertCircle, Boxes } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AppLayout } from '@/components/layout';
import { useProducts } from '@/hooks/useProducts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLowStockThreshold } from '@/store/slices/dashboardSlice';
import { formatCurrencyBRL } from '@/utils/formatters';

export function DashboardContent() {
  const t = useTranslations('dashboard');
  const { products, isLoading, isError, error } = useProducts();
  const dispatch = useAppDispatch();
  const lowStockThreshold = useAppSelector(
    (state) => state.dashboard.lowStockThreshold
  );

  const lowStockProducts = useMemo(
    () => products.filter((product) => product.quantity <= lowStockThreshold),
    [products, lowStockThreshold]
  );

  const mostExpensiveProducts = useMemo(
    () => [...products].sort((a, b) => b.price - a.price).slice(0, 5),
    [products]
  );

  const handleThresholdChange = (value: string) => {
    if (value.trim() === '') return;

    const threshold = Number(value);
    if (Number.isSafeInteger(threshold) && threshold >= 0) {
      dispatch(setLowStockThreshold(threshold));
    }
  };

  const cardClassName =
    'rounded-xl border border-gray-200 bg-[#FEFEFE] p-5 shadow-xs dark:border-gray-800 dark:bg-[#1B2129]';
  const headingClassName =
    'font-poppins text-base font-bold text-[#1B2129] dark:text-[#F9F9FA]';

  return (
    <AppLayout
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {isError && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl border border-[#CC2E30]/30 bg-[#CC2E30]/10 p-4 text-sm text-[#CC2E30]"
          >
            <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
            <span>
              {t('loadError', {
                message:
                  error instanceof Error ? error.message : t('requestFailed'),
              })}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          <article className={cardClassName}>
            <h2 className={headingClassName}>{t('lowStockTitle')}</h2>
            <div className="mt-4">
              <label
                htmlFor="low-stock-threshold"
                className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300"
              >
                {t('thresholdLabel')}
              </label>
              <input
                id="low-stock-threshold"
                aria-label={t('thresholdLabel')}
                type="number"
                min="0"
                step="1"
                value={lowStockThreshold}
                onChange={(event) =>
                  handleThresholdChange(event.currentTarget.value)
                }
                className="w-full rounded-lg border border-gray-300 bg-[#FEFEFE] px-3 py-2 text-sm text-[#1B2129] transition-colors focus:border-[#3E63AC] focus:outline-none focus:ring-2 focus:ring-[#6085FF]/20 dark:border-gray-700 dark:bg-[#151A21] dark:text-[#F9F9FA]"
              />
            </div>
            {isLoading || isError ? (
              <p
                role="status"
                className="mt-4 text-sm text-gray-500 dark:text-gray-400"
              >
                {isLoading
                  ? t('loadingProducts')
                  : t('stockUnavailable')}
              </p>
            ) : lowStockProducts.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {lowStockProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-4 text-sm font-medium text-[#CC2E30]"
                  >
                    <span className="min-w-0 truncate">{product.name}</span>
                    <span className="shrink-0">
                      {product.quantity} {t('quantityUnit')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {t('noLowStockProducts')}
              </p>
            )}
          </article>

          <article className={cardClassName}>
            <h2 className={headingClassName}>{t('mostExpensiveTitle')}</h2>
            {isLoading || isError ? (
              <p
                role="status"
                className="mt-4 text-sm text-gray-500 dark:text-gray-400"
              >
                {isLoading
                  ? t('loadingProducts')
                  : t('pricesUnavailable')}
              </p>
            ) : mostExpensiveProducts.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {mostExpensiveProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-4 text-sm font-medium text-[#218F4E]"
                  >
                    <span className="min-w-0 truncate">{product.name}</span>
                    <span className="shrink-0">
                      {formatCurrencyBRL(product.price)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {t('noProducts')}
              </p>
            )}
          </article>

          <article
            className={`${cardClassName} flex flex-col items-center justify-center text-center`}
          >
            <Boxes
              aria-hidden="true"
              className="mb-3 h-8 w-8 text-[#3E63AC] dark:text-[#6085FF]"
            />
            <h2 className={headingClassName}>{t('totalProductsTitle')}</h2>
            {isLoading || isError ? (
              <p
                role="status"
                className="mt-3 text-sm text-gray-500 dark:text-gray-400"
              >
                {isLoading
                  ? t('loadingProducts')
                  : t('totalProductsUnavailable')}
              </p>
            ) : (
              <>
                <p className="mt-2 font-poppins text-4xl font-bold text-[#1B2129] dark:text-[#F9F9FA]">
                  {products.length}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t('productsAdded')}
                </p>
              </>
            )}
          </article>
        </div>
      </div>
    </AppLayout>
  );
}

export default DashboardContent;
