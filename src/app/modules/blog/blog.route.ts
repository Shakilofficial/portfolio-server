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

router.get('/:id', blogControllers.getSingleBlog);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);

router.patch(
  '/:id/featured',
  auth('admin'),
  blogControllers.toggleBlogFeatured,
);

router.patch(
  '/:id/published',
  auth('admin'),
  blogControllers.toggleBlogPublished,
);

router.delete('/:id', auth('admin'), blogControllers.deleteBlog);

router.get('/', blogControllers.getAllBlogs);

export const blogRoutes = router;
