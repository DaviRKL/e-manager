'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppSelector } from '@/store/hooks';

interface GlobalProviderProps {
  children: React.ReactNode;
}

function ThemeEffect({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <Provider store={store}>
      <ThemeEffect>{children}</ThemeEffect>
    </Provider>
  );
}

export default GlobalProvider;
