import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';

const router = Router();

// Login route
router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.login,
);

export const authRoutes = router;
