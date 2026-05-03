import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must give consent to subscribe' }),
  }),
  locale: z.enum(['de', 'en']).default('de'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
