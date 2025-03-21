import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { parseBody } from '../../middlewares/bodyParser';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '../user/user.interface';
import { projectControllers } from './project.controller';
import { projectValidations } from './project.validation';

const router = Router();

router.get('/', projectControllers.getAllProjects);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.single('coverImage'),
  parseBody,
  validateRequest(projectValidations.createProjectValidationSchema),
  projectControllers.createProject,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('coverImage'),
  parseBody,
  validateRequest(projectValidations.updateProjectValidationSchema),
  projectControllers.updateProject,
);

router.get('/:id', projectControllers.getSingleProject);

router.patch(
  '/:id/featured',
  auth(UserRole.ADMIN),
  projectControllers.toggleProjectFeatured,
);
router.delete('/:id', auth(UserRole.ADMIN), projectControllers.deleteProject);

export const projectRoutes = router;
