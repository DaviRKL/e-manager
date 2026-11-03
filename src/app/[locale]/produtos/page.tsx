import { setRequestLocale } from 'next-intl/server';
import { ProductsPageContent } from '@/features/products/ProductsPageContent';

export default async function ProdutosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsPageContent />;
}
