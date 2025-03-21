import { z } from 'zod';
import { BlogCategory } from './blog.interface';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50).trim(),
    subtitle: z.string().min(3).max(50).trim(),
    category: z.nativeEnum(BlogCategory),
    content: z.string().min(10).trim(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50).trim().optional(),
    subtitle: z.string().min(3).max(50).trim().optional(),
    category: z.nativeEnum(BlogCategory).optional(),
    content: z.string().min(10).trim().optional(),
  }),
});

export const blogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
