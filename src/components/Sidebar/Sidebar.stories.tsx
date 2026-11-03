import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Design System/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeHref: {
      control: 'select',
      options: ['/dashboard', '/produtos'],
      description: 'Rota atualmente ativa no menu',
    },
    collapsed: {
      control: 'boolean',
      description: 'Visualização condensada (ícones)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const DashboardActive: Story = {
  args: {
    activeHref: '/dashboard',
    collapsed: false,
  },
};

export const ProdutosActive: Story = {
  args: {
    activeHref: '/produtos',
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    activeHref: '/dashboard',
    collapsed: true,
  },
};
