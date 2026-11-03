import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger', 'outline'],
      description: 'Variante visual do botão baseada no style guide',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do botão',
    },
    isLoading: {
      control: 'boolean',
      description: 'Indica estado de carregamento',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o botão',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupa a largura total do container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Salvar Registro',
    variant: 'primary',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Excluir Item',
    variant: 'danger',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Cancelar',
    variant: 'outline',
    size: 'md',
  },
};

export const Loading: Story = {
  args: {
    children: 'Processando...',
    variant: 'primary',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Ação Bloqueada',
    variant: 'primary',
    disabled: true,
  },
};
