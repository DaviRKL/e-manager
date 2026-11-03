import { z } from 'zod';

export type ProductSchemaTranslationKey =
  | 'validation.nameRequired'
  | 'validation.nameMin'
  | 'validation.priceRequired'
  | 'validation.pricePositive'
  | 'validation.quantityRequired'
  | 'validation.quantityInteger'
  | 'validation.quantityPositive'
  | 'validation.categoryRequired';

export function getProductSchema(
  t: (key: ProductSchemaTranslationKey) => string
) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('validation.nameRequired'))
      .min(3, t('validation.nameMin')),
    price: z
      .number({ message: t('validation.priceRequired') })
      .positive(t('validation.pricePositive')),
    quantity: z
      .number({ message: t('validation.quantityRequired') })
      .int(t('validation.quantityInteger'))
      .positive(t('validation.quantityPositive')),
    category: z
      .string()
      .trim()
      .min(1, t('validation.categoryRequired')),
  });
}

export type ProductFormData = z.infer<ReturnType<typeof getProductSchema>>;
