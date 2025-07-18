import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../enums/user-role';

const registerUserValidationSchema = z.object({
  body: z.object({

    email: z
      .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
      })
      .email({ message: 'invalid email adresss' }),

    role: z.enum([ENUM_USER_ROLE.COOKS, ENUM_USER_ROLE.RESTAURANT], {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be either cooks or restaurant',
    }),

    password: z
      .string({
        required_error: 'password is required',
      })
      .min(8, 'Password must be at least 8 characters!'),
  }),
});

const userValidationZodSchema = {
  registerUserValidationSchema,
};

export default userValidationZodSchema;

/*

export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z
      .string({ invalid_type_error: 'Please add a valid email' })
      .email('Invalid email format')
      .optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().min(1, 'Phone number is required').max(15).optional(),
  }),
});


*/
