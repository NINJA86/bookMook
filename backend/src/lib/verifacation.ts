import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('ایمیل معتبر نیست'),

  phoneNumber: z.string().regex(/^0[0-9]{10}$/, 'invalid phone number'),

  password: z.string().min(8, 'password length must include 8 char'),
});

export const loginSchema = z
  .object({
    email: z.string().email().optional(),
    phoneNumber: z
      .string()
      .regex(/^0[0-9]{10}$/)
      .optional(),
    password: z.string().min(8, 'password length must include 8 char'),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: 'email or phone number is required',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
