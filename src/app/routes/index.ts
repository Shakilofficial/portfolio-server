import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { messageRoutes } from '../modules/message/message.route';
import { projectRoutes } from '../modules/project/project.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/message',
    route: messageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
