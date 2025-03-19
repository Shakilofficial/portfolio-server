import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IImageFile } from '../../interface/IImageFile';
import { IJwtPayload } from '../auth/auth.interface';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (
  payload: Partial<IBlog>,
  thumbnail: IImageFile,
  user: IJwtPayload,
) => {
  if (thumbnail && thumbnail.path) {
    payload.thumbnail = thumbnail.path;
  }
  const blog = new Blog({
    ...payload,
    createdBy: user.id,
  });
  const result = await blog.save();
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  thumbnail: IImageFile,
  user: IJwtPayload,
) => {
  if (thumbnail && thumbnail.path) {
    payload.thumbnail = thumbnail.path;
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate('createdBy', 'name email')
    .populate('technologies', 'name');
  return updatedBlog;
};

const getBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOne({ slug })
    .populate('createdBy', 'name email')
    .populate('technologies', 'name');
  return blog;
};

const toggleBlogFeatured = async (id: string, user: IJwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { isFeatured: !blog.isFeatured },
    { new: true },
  );
  return updatedBlog;
};

const toggleBlogPublished = async (id: string, user: IJwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { isPublished: !blog.isPublished },
    { new: true },
  );
  return updatedBlog;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find(), query)
    .search(['title', 'subtitle', 'content'])
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await blogsQuery.modelQuery;
  const meta = await blogsQuery.countTotal();
  return { result, meta };
};

const deleteBlog = async (id: string, user: IJwtPayload) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to delete this blog',
    );
  }
  return await blog.deleteOne();
};

export const blogServices = {
  createBlog,
  updateBlog,
  getBlogBySlug,
  toggleBlogFeatured,
  toggleBlogPublished,
  deleteBlog,
  getAllBlogs,
};
