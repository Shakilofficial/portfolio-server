import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.createBlog(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully!',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.updateBlog(
    req.params.id,
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

const toggleBlogFeatured = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.toggleBlogFeatured(
    req.params.id,
    req.user as IJwtPayload, // Assuming req.user is the logged-in user's JWT payload
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `This blog is now ${result?.isFeatured ? 'featured' : 'not featured'}!`,
    data: result,
  });
});

const toggleBlogPublished = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.toggleBlogPublished(
    req.params.id,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `This blog is now ${result?.isPublished ? 'published' : 'not published'}! Blog`,
    data: result,
  });
});

const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getBlogBySlug(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog retrieved successfully!',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs retrieved successfully!',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.deleteBlog(
    req.params.id,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully!',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  toggleBlogFeatured,
  toggleBlogPublished,
  getBlogBySlug,
  getAllBlogs,
  deleteBlog,
};
