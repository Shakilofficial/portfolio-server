import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { parseBody } from '../../middlewares/bodyParser';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '../user/user.interface';
import { skillControllers } from './skill.controller';
import { skillValidations } from './skill.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  validateRequest(skillValidations.createSkillValidationSchema),
  skillControllers.createSkill,
);

router.get('/', skillControllers.getAllSkills);

router.get('/all', skillControllers.categoryWiseAllSkills);
router.get('/:id', skillControllers.getSingleSkill);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  validateRequest(skillValidations.updateSkillValidationSchema),
  skillControllers.updateSkill,
);

router.delete('/:id', auth(UserRole.ADMIN), skillControllers.deleteSkill);

export const skillRoutes = router;
