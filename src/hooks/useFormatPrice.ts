import { useCallback } from 'react';
import { formatCurrencyBRL } from '@/utils/formatters';

export function useFormatPrice() {
  const formatPrice = useCallback((value: number | string) => {
    return formatCurrencyBRL(value);
  }, []);

  return { formatPrice };
}

export default useFormatPrice;
