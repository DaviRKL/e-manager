import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do rótulo do campo',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    error: {
      control: 'text',
      description: 'Mensagem de validação de erro exibida em vermelho (#CC2E30)',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ajuda auxiliar quando não há erro',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a interação com o campo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Nome do Produto',
    placeholder: 'Ex: Teclado Mecânico RGB',
  },
};

export const WithError: Story = {
  args: {
    label: 'Preço Unitário',
    placeholder: 'R$ 0,00',
    defaultValue: '-10',
    error: 'O valor não pode ser negativo ou nulo.',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Código SKU',
    placeholder: 'Ex: PROD-12345',
    helperText: 'Código identificador único gerado pelo estoque.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'ID do Sistema',
    value: 'EM-9948271',
    disabled: true,
  },
};
