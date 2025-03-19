import { Router } from 'express';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import { parseBody } from '../../middlewares/bodyParser';
import validateRequest from '../../middlewares/validateRequest';
import { UserRole } from '../user/user.interface';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.single('thumbnail'),
  parseBody,
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('thumbnail'),
  parseBody,
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);

router.get('/:slug', blogControllers.getBlogBySlug);

router.patch(
  '/:id/featured',
  auth(UserRole.ADMIN),
  blogControllers.toggleBlogFeatured,
);

router.patch(
  '/:id/published',
  auth(UserRole.ADMIN),
  blogControllers.toggleBlogPublished,
);

router.get('/', blogControllers.getAllBlogs);

router.delete('/:id', auth(UserRole.ADMIN), blogControllers.deleteBlog);

export const blogRoutes = router;
