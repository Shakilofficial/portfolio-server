import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { projectControllers } from './project.controller';
import { projectValidations } from './project.validation';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(projectValidations.createProjectValidationSchema),
  projectControllers.createProject,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(projectValidations.updateProjectValidationSchema),
  projectControllers.updateProject,
);

router.patch(
  '/:id/featured',
  auth('admin'),
  projectControllers.toggleProjectFeatured,
);

router.delete('/:id', auth('admin'), projectControllers.deleteProject);

router.get('/:id', projectControllers.getSingleProject);

router.get('/', projectControllers.getAllProjects);

export const projectRoutes = router;
