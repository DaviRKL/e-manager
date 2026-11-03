import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Design System/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Estado atual do tema gerenciado pelo uiSlice',
    },
    title: {
      control: 'text',
      description: 'Título da página ativa',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo ou breadcrumb auxiliar',
    },
    userName: {
      control: 'text',
      description: 'Nome do usuário autenticado',
    },
    userRole: {
      control: 'text',
      description: 'Papel do usuário',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LightMode: Story = {
  args: {
    theme: 'light',
    title: 'Dashboard Geral',
    subtitle: 'Métricas e indicadores em tempo real',
    userName: 'Carlos Silva',
    userRole: 'Administrador',
  },
};

export const DarkMode: Story = {
  args: {
    theme: 'dark',
    title: 'Catálogo de Produtos',
    subtitle: 'Gerenciamento de estoque',
    userName: 'Carlos Silva',
    userRole: 'Administrador',
  },
};
