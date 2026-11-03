'use client';

import React, { useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect active item from pathname
  const activeHref = pathname?.includes('/produtos')
    ? '/produtos'
    : '/dashboard';

  const handleNavigate = (href: string) => {
    setIsMobileMenuOpen(false);
    const match = pathname?.match(/^\/([^/]+)/);
    const localePrefix = match ? match[1] : '';
    if (localePrefix === 'pt-br' || localePrefix === 'en-us') {
      router.push(`/${localePrefix}${href}`);
    } else {
      router.push(href);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F7] text-[#1B2129] transition-colors dark:bg-[#1B2129] dark:text-[#F9F9FA]">
      <Sidebar
        activeHref={activeHref}
        onNavigate={handleNavigate}
        className={`fixed inset-y-0 left-0 z-50 h-dvh w-64 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      />

      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label={t('closeMenuOverlay')}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="min-h-screen min-w-0 md:ml-64">
        <Header
          title={title ?? t('defaultTitle')}
          subtitle={subtitle ?? t('defaultSubtitle')}
          theme={theme}
          onToggleTheme={() => dispatch(toggleTheme())}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={() =>
            setIsMobileMenuOpen((isOpen) => !isOpen)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
