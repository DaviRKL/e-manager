import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  price: z
    .number({ message: 'Informe um preço válido' })
    .positive('O preço deve ser um número positivo'),
  quantity: z
    .number({ message: 'Informe uma quantidade válida' })
    .int('A quantidade deve ser um número inteiro')
    .positive('A quantidade deve ser um número positivo'),
  category: z
    .string()
    .trim()
    .min(1, 'A categoria é obrigatória'),
});

export type ProductFormData = z.infer<typeof productSchema>;
