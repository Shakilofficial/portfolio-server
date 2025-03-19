import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '../user/user.interface';
import { experienceControllers } from './experience.controller';
import { experienceValidations } from './experience.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.ADMIN),
  validateRequest(experienceValidations.createExperienceValidationSchema),
  experienceControllers.createExperience,
);

router.get('/', experienceControllers.getAllExperiences);

router.get('/:id', experienceControllers.getSingleExperience);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(experienceValidations.updateExperienceValidationSchema),
  experienceControllers.updateExperience,
);

router.delete(
  '/:id',
  auth(UserRole.ADMIN),
  experienceControllers.deleteExperience,
);

export const experienceRoutes = router;
