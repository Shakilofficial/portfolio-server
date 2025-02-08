import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { messageRoutes } from '../modules/message/message.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/message',
    route: messageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
