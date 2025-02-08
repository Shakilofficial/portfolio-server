import { z } from 'zod';
import { projectCategories } from './project.constant';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    coverImage: z.string({ required_error: 'Cover image is required' }),
    category: z
      .enum([...projectCategories] as [string, ...string[]])
      .optional(),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    category: z
      .enum([...projectCategories] as [string, ...string[]])
      .optional(),
  }),
});

export const projectValidations = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
