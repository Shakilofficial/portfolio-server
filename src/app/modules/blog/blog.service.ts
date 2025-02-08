import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog) => {
  const blog = (await Blog.create(payload)).populate('author');
  return blog;
};

const getSingleBlog = async (id: string) => {
  // Get the blog with the provided id
  const blog = await Blog.findById(id);

  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // Populate the author field
  const result = blog.populate('author');
  return result;
};

const updateBlog = async (
  id: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  // Get the blog with the provided id
  const blog = await Blog.findById(id);
  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // Check if user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can not update this blog',
    );
  }
  // Update the blog with the provided id, payload, and options and populate the author field
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');

  return result;
};

const deleteBlog = async (id: string, userId: string) => {
  // Get the blog with the provided id
  const blog = await Blog.findById(id);
  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // Check if user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can not delete this blog',
    );
  }
  // Delete the blog with the provided id
  return blog.deleteOne();
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(['title', 'content'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await blogsQuery.modelQuery;
  const meta = await blogsQuery.countTotal();
  return { result, meta };
};

export const blogServices = {
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
