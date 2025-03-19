import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
   
  }),
});

export const blogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
