import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '../user/user.interface';
import { messageControllers } from './message.controller';
import { messageValidations } from './message.validation';

const router = Router();

router.post(
  '/',
  validateRequest(messageValidations.sendMessageValidationSchema),
  messageControllers.sendMessage,
);

router.get('/', auth(UserRole.ADMIN), messageControllers.getAllMessages);

router.delete('/:id', auth(UserRole.ADMIN), messageControllers.deleteMessage);

export const messageRoutes = router;
