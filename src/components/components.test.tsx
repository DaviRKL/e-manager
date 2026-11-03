import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Button } from './Button';
import { Input } from './Input';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock('@/i18n/routing', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({ replace }),
}));

describe('Design System Components', () => {
  it('renders Button variants and fires onClick', () => {
    const handleClick = vi.fn();
    render(
      <Button variant="danger" onClick={handleClick}>
        Excluir
      </Button>
    );

    const btn = screen.getByRole('button', { name: /excluir/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders Input with error message', () => {
    render(<Input label="E-mail" error="E-mail inválido" />);
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('E-mail inválido');
  });

  it('renders Sidebar with links for Dashboard and Produtos', () => {
    const handleNavigate = vi.fn();
    render(<Sidebar activeHref="/produtos" onNavigate={handleNavigate} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    const produtosBtn = screen.getByText('Produtos');
    expect(produtosBtn).toBeInTheDocument();

    fireEvent.click(produtosBtn);
    expect(handleNavigate).toHaveBeenCalledWith('/produtos');
  });

  it('renders Header with theme toggle', () => {
    const handleToggle = vi.fn();
    render(
      <NextIntlClientProvider locale="pt-br" messages={{}}>
        <Header theme="light" onToggleTheme={handleToggle} />
      </NextIntlClientProvider>
    );

    const toggleBtn = screen.getByRole('button', {
      name: /alternar para tema escuro/i,
    });
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('switches locale while preserving the current pathname', () => {
    render(
      <NextIntlClientProvider locale="pt-br" messages={{}}>
        <Header />
      </NextIntlClientProvider>
    );

    const languageSwitcher = screen.getByRole('combobox', { name: 'Idioma' });
    expect(languageSwitcher).toHaveValue('pt-br');
    fireEvent.change(languageSwitcher, { target: { value: 'en-us' } });

    expect(replace).toHaveBeenCalledWith('/dashboard', { locale: 'en-us' });
    expect(screen.queryByRole('button', { name: 'Notificações' })).toBeNull();
  });
});
