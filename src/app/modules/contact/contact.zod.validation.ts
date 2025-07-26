import { z } from 'zod';

const contactRequestSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    subject: z.string().min(10, { message: 'Subject must be at least 10 characters' }),
    opinion: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  }),
});

export default {
    contactRequestSchema
}