import { z } from 'zod';

export const skillValidations = {
  createSkillValidationSchema: z.object({
    body: z.object({
      name: z.string().min(3).max(50).trim(),
      category: z.enum(['Language', 'Frontend', 'Backend', 'DevOps', 'Tools']),
    }),
  }),

  updateSkillValidationSchema: z.object({
    body: z.object({
      name: z.string().min(3).max(50).trim().optional(),
      category: z
        .enum(['Language', 'Frontend', 'Backend', 'DevOps', 'Tools'])
        .optional(),
    }),
  }),
};
