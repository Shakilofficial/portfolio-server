import { Router } from 'express';

import { UserRole } from '../user/user.interface';
import { metaControllers } from './meta.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth(UserRole.ADMIN), metaControllers.getMetaData);

export const metaRoutes = router;
