import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { experienceRoutes } from '../modules/experience/experience.route';
import { messageRoutes } from '../modules/message/message.route';
import { projectRoutes } from '../modules/project/project.route';
import { skillRoutes } from '../modules/skill/skill.route';

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
    path: '/messages',
    route: messageRoutes,
  },
  {
    path: '/skills',
    route: skillRoutes,
  },
  {
    path: '/experiences',
    route: experienceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
