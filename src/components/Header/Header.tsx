import React from 'react';
import { Menu, Moon, Sun, User, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '../LanguageSwitcher';

export interface HeaderProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme = 'light',
  onToggleTheme,
  title,
  subtitle,
  userName,
  userRole,
  isMobileMenuOpen = false,
  onToggleMobileMenu,
  className = '',
}) => {
  const t = useTranslations('header');
  const isDark = theme === 'dark';

  return (
    <header
      className={`h-16 w-full gap-3 bg-[#FEFEFE] px-4 dark:bg-[#1B2129] border-b border-gray-200 dark:border-gray-800 sm:px-6 flex items-center justify-between transition-colors duration-200 font-roboto ${className}`}
    >
      <button
        type="button"
        onClick={onToggleMobileMenu}
        aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
        aria-expanded={isMobileMenuOpen}
        aria-controls="app-sidebar"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#1B2129] transition-colors hover:bg-[#F0F2F7] focus:outline-none focus:ring-2 focus:ring-[#6085FF] dark:text-[#F9F9FA] dark:hover:bg-[#151A21] md:hidden"
      >
        {isMobileMenuOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      {/* Title / Breadcrumb */}
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-poppins font-bold text-lg text-[#1B2129] dark:text-[#F9F9FA]">
          {title ?? t('defaultTitle')}
        </h1>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            isDark ? t('themeToLight') : t('themeToDark')
          }
          className="p-2 rounded-lg text-[#1B2129] dark:text-[#F9F9FA] hover:bg-[#F0F2F7] dark:hover:bg-[#151A21] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6085FF] cursor-pointer"
          title={isDark ? t('lightMode') : t('darkMode')}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-[#3E63AC]" />
          )}
        </button>

        <LanguageSwitcher />

        <div className="h-6 w-px bg-gray-200 dark:border-gray-700" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#F0F2F7] dark:bg-[#151A21] flex items-center justify-center text-[#3E63AC] dark:text-[#6085FF] font-medium border border-gray-200 dark:border-gray-700">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold font-poppins text-[#1B2129] dark:text-[#F9F9FA] leading-tight">
              {userName ?? t('defaultUserName')}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
              {userRole ?? t('defaultUserRole')}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
