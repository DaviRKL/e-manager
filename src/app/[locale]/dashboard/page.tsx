import { setRequestLocale } from 'next-intl/server';
import { DashboardContent } from '@/features/dashboard/DashboardContent';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardContent />;
}
