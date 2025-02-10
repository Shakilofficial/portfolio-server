import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog) => {
  const blog = await Blog.create(payload);
  await blog.populate('author', 'name email profileImage');
  return blog;
};

const getSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id).populate(
    'author',
    'name email profileImage',
  );

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

const updateBlog = async (
  id: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can not update this blog',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author', 'name email profileImage');

  return result;
};

const deleteBlog = async (id: string, userId: string) => {
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can not delete this blog',
    );
  }

  return blog.deleteOne();
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(
    Blog.find().populate('author', 'name email profileImage'),
    query,
  )
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
