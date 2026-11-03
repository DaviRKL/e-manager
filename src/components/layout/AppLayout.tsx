'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/uiSlice';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const t = useTranslations('header');
  const pathname = usePathname();
  const router = useRouter();
  const theme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();

  // Detect active item from pathname
  const activeHref = pathname?.includes('/produtos')
    ? '/produtos'
    : '/dashboard';

  const handleNavigate = (href: string) => {
    const match = pathname?.match(/^\/([^/]+)/);
    const localePrefix = match ? match[1] : '';
    if (localePrefix === 'pt-br' || localePrefix === 'en-us') {
      router.push(`/${localePrefix}${href}`);
    } else {
      router.push(href);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F0F2F7] dark:bg-[#1B2129] text-[#1B2129] dark:text-[#F9F9FA] transition-colors">
      {/* Sidebar */}
      <Sidebar activeHref={activeHref} onNavigate={handleNavigate} />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title ?? t('defaultTitle')}
          subtitle={subtitle ?? t('defaultSubtitle')}
          theme={theme}
          onToggleTheme={() => dispatch(toggleTheme())}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
