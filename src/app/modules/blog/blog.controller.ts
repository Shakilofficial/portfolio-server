import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const userId = req.user?.id as JwtPayload;
  const payload = { ...req.body, author: userId };
  const result = await blogServices.createBlog(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  // Get id and userId from request params and user object
  const id = req.params.id;
  const userId = req.user?.id as string;
  // Update the blog with the provided id, userId, and payload
  const result = await blogServices.updateBlog(id, userId, req.body);
  // Send response with the updated blog data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

//toggle blog featured controller for toggling the featured status of a blog
const toggleBlogFeatured = catchAsync(async (req, res) => {
  // Get id and userId from request params and user object
  const id = req.params.id;
  const userId = req.user?.id as string;
  // Toggle the featured status of the blog with the provided id and userId
  const result = await blogServices.toggleBlogFeatured(id, userId);
  // Send response with the updated blog data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog featured status updated successfully',
    data: result,
  });
});

//toggle blog published status of a blog
const toggleBlogPublished = catchAsync(async (req, res) => {
  // Get id and userId from request params and user object
  const id = req.params.id;
  const userId = req.user?.id as string;
  // Toggle the published status of the blog with the provided id and userId
  const result = await blogServices.toggleBlogPublished(id, userId);
  // Send response with the updated blog data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog published status updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  // Get id and userId from request params and user object
  const id = req.params.id;
  const userId = req.user?.id as string;
  // Delete the blog with the provided id and userId
  await blogServices.deleteBlog(id, userId);
  // Send response without data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

//Get single blog controller for retrieving a single blog
const getSingleBlog = catchAsync(async (req, res) => {
  // Get id from request params
  const id = req.params.id;
  // Get single blog with the provided id
  const result = await blogServices.getSingleBlog(id);
  // Send response with the single blog data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

// Get all blogs controller for retrieving all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  // Get query from request query object
  const result = await blogServices.getAllBlogs(req.query);
  // Send response with the all blogs data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  toggleBlogFeatured,
  toggleBlogPublished,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
};
