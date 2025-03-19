import { z } from 'zod';

const createExperienceValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50).trim(),
    company: z.string().min(3).max(50).trim(),
    position: z.string().min(3).max(50).trim(),
    location: z.string().min(3).max(50).trim(),
    startDate: z.date().min(new Date()),
    endDate: z.date().min(new Date()).optional(),
    description: z.string().min(3).max(50).trim().optional(),
  }),
});

const updateExperienceValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(50).trim().optional(),
    company: z.string().min(3).max(50).trim().optional(),
    position: z.string().min(3).max(50).trim().optional(),
    location: z.string().min(3).max(50).trim().optional(),
    startDate: z.date().min(new Date()).optional(),
    endDate: z.date().min(new Date()).optional(),
    description: z.string().min(3).max(50).trim().optional(),
  }),
});

export const experienceValidations = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
};
