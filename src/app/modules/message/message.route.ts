import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { messageControllers } from './message.controller';
import { messageValidations } from './message.validation';

const router = Router();

router.post(
  '/',
  validateRequest(messageValidations.sendMessageValidationSchema),
  messageControllers.sendMessage,
);

router.get('/', messageControllers.getAllMessages);

router.delete('/:id', messageControllers.deleteMessage);

export const messageRoutes = router;
