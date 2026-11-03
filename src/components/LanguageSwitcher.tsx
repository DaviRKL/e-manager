'use client';

import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('header');
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === 'pt-br' || nextLocale === 'en-us') {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <div className="relative">
      <label htmlFor="language-switcher" className="sr-only">
        {t('language')}
      </label>
      <select
        id="language-switcher"
        value={locale}
        onChange={(event) => handleLocaleChange(event.currentTarget.value)}
        className="appearance-none rounded-lg border border-gray-200 bg-[#FEFEFE] py-2 pl-3 pr-8 text-sm font-medium text-[#1B2129] transition-colors hover:bg-[#F0F2F7] focus:outline-none focus:ring-2 focus:ring-[#6085FF] dark:border-gray-700 dark:bg-[#1B2129] dark:text-[#F9F9FA] dark:hover:bg-[#151A21]"
      >
        <option value="pt-br">PT-BR</option>
        <option value="en-us">EN-US</option>
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
      />
    </div>
  );
}

export default LanguageSwitcher;
