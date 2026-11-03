import React from 'react';
import Image from 'next/image';
import { LayoutDashboard, Package, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface SidebarItem {
  id: string;
  label: 'dashboard' | 'products';
  href: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export interface SidebarProps {
  activeHref?: string;
  onNavigate?: (href: string) => void;
  items?: SidebarItem[];
  collapsed?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'produtos',
    label: 'products',
    href: '/produtos',
    icon: Package,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeHref = '/dashboard',
  onNavigate,
  items = DEFAULT_ITEMS,
  collapsed = false,
  className = '',
}) => {
  const t = useTranslations('navigation');

  return (
    <aside
      id="app-sidebar"
      className={`h-dvh bg-[#FEFEFE] dark:bg-[#1B2129] border-r border-gray-200 dark:border-gray-800 flex flex-col font-roboto ${
        collapsed ? 'w-20' : 'w-64'
      } ${className}`}
      aria-label={t('menuLabel')}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800/80">
        <div
          className={`relative shrink-0 ${
            collapsed ? 'h-8 w-8 overflow-hidden' : 'h-[38px] w-[180px]'
          }`}
        >
          <Image
            src="/e-manager-logo.svg"
            alt="e-manager"
            width={180}
            height={38}
            priority
            className="max-w-none brightness-0 dark:invert"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#3E63AC] text-[#F9F9FA] shadow-sm font-semibold'
                  : 'text-[#1B2129] dark:text-[#F9F9FA] hover:bg-[#F0F2F7] dark:hover:bg-[#151A21] hover:text-[#3E63AC] dark:hover:text-[#6085FF]'
              } ${collapsed ? 'justify-center px-0' : ''}`}
            >
              {Icon && (
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#F9F9FA]'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-current'
                  }`}
                />
              )}
              {!collapsed && <span>{t(item.label)}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800/80">
        {!collapsed ? (
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#218F4E] inline-block" />
            <span>{t('systemStatus')}</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span
              className="w-2 h-2 rounded-full bg-[#218F4E] inline-block"
              title={t('systemStatus')}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
