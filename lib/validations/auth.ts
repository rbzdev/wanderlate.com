import { z } from 'zod';

/**
 * Validation schema for user registration
 * Matches the User model in Prisma schema
 */
export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  birthDay: z.string().min(1, 'Day is required'),
  birthMonth: z.string().min(1, 'Month is required'),
  birthYear: z.string().min(4, 'Year is required'),
  country: z.string().optional(),
  language: z.string().optional(),
  currency: z.string().default('EUR'),
  accountType: z.enum(['traveler', 'host']),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[#?!@$%^&*-]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  acceptMarketing: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Schema for registration response
 */
export const registerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastName: z.string(),
  }).optional(),
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;

/**
 * Validation schema for user login
 */
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Schema for login response
 */
export const loginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastName: z.string(),
    accountType: z.enum(['traveler', 'host']),
  }).optional(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
