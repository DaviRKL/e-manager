import React from 'react';
import { Sun, Moon, User } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher';

export interface HeaderProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  title?: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  theme = 'light',
  onToggleTheme,
  title = 'Visão Geral',
  subtitle,
  userName = 'Administrador',
  userRole = 'Gestor',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`h-16 w-full bg-[#FEFEFE] dark:bg-[#1B2129] border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between transition-colors duration-200 font-roboto ${className}`}
    >
      {/* Title / Breadcrumb */}
      <div>
        <h1 className="font-poppins font-bold text-lg text-[#1B2129] dark:text-[#F9F9FA]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'
          }
          className="p-2 rounded-lg text-[#1B2129] dark:text-[#F9F9FA] hover:bg-[#F0F2F7] dark:hover:bg-[#151A21] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6085FF] cursor-pointer"
          title={isDark ? 'Modo Claro' : 'Modo Escuro'}
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
              {userName}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
