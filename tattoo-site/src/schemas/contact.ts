import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional(),
  idea: z.string().min(10, 'Please describe your idea in more detail').max(2000),
  size: z.string().max(100).optional(),
  placement: z.string().max(100).optional(),
  preferredDates: z.string().max(200).optional(),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the privacy policy' }),
  }),
  hcaptchaToken: z.string().min(1, 'Please complete the captcha'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
