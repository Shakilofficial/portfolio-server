import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);

router.delete('/:id', auth('admin'), blogControllers.deleteBlog);

router.get('/:id', blogControllers.getSingleBlog);

router.get('/', blogControllers.getAllBlogs);

export const blogRoutes = router;
