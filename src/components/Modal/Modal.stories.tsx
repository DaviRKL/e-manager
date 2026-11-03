import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/pt-br.json';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="pt-br" messages={messages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Estado de visibilidade do modal',
    },
    title: {
      control: 'text',
      description: 'Título exibido no cabeçalho do modal',
    },
    description: {
      control: 'text',
      description: 'Descrição ou subtítulo explicativo',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Largura máxima do modal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Exemplo de Modal',
    description: 'Este é um modal genérico do design system.',
    children: (
      <div className="space-y-4">
        <p className="text-sm">Conteúdo principal do modal estilizado com as cores do Style Guide.</p>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Cancelar</Button>
          <Button variant="primary">Confirmar</Button>
        </div>
      </div>
    ),
  },
};
