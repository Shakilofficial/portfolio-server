import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IImageFile } from '../../interface/IImageFile';
import { IJwtPayload } from '../auth/auth.interface';
import { IProject } from './project.interface';
import { Project } from './project.model';

const getAllProjects = async (query: Record<string, unknown>) => {
  const projectsQuery = new QueryBuilder(
    Project.find().populate('createdBy', 'name email').populate({
      path: 'technologies',
      model: 'Skill',
      select: 'name icon',
    }),
    query,
  )
    .search(['title', 'description'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await projectsQuery.modelQuery;
  const meta = await projectsQuery.countTotal();

  return { result, meta };
};

const createProject = async (
  payload: Partial<IProject>,
  coverImage: IImageFile,
  user: IJwtPayload,
) => {
  if (coverImage && coverImage.path) {
    payload.coverImage = coverImage.path;
  }

  const project = new Project({
    ...payload,
    createdBy: user.id,
  });
  const result = await project.save();
  return result;
};

const updateProject = async (
  id: string,
  payload: Partial<IProject>,
  coverImage: IImageFile,
  user: IJwtPayload,
) => {
  if (coverImage && coverImage.path) {
    payload.coverImage = coverImage.path;
  }

  const project = await Project.findById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }
  if (project.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this project',
    );
  }

  const updatedProject = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProject;
};

const getSingleProject = async (id: string) => {
  const project = await Project.findById(id)
    .populate('createdBy', 'name email')
    .populate('technologies', 'name icon');

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }

  return project;
};

const toggleProjectFeatured = async (id: string, user: IJwtPayload) => {
  const project = await Project.findById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }
  if (project.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this project',
    );
  }

  const result = await Project.findByIdAndUpdate(id, {
    isFeatured: !project.isFeatured,
  });

  return result;
};

const deleteProject = async (id: string, user: IJwtPayload) => {
  const project = await Project.findById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }

  if (project.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to delete this project',
    );
  }

  return await project.deleteOne();
};

export const projectServices = {
  createProject,
  getSingleProject,
  updateProject,
  toggleProjectFeatured,
  deleteProject,
  getAllProjects,
};
