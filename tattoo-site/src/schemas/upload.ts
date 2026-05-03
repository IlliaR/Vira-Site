import { z } from 'zod';

export const imageMetaSchema = z.object({
  altTextEn: z.string().max(300).optional().default(''),
  altTextDe: z.string().max(300).optional().default(''),
  categoryId: z.string().optional(),
  tags: z.string().max(500).optional().default(''),
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});

export type ImageMetaData = z.infer<typeof imageMetaSchema>;
