import QueryBuilder from '../../builder/QueryBuilder';
import { IProject } from './project.interface';
import { Project } from './project.model';

const createProject = async (payload: IProject) => {
  const project = await Project.create(payload);
  return project;
};

const getSingleProject = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }
  if (project.isDeleted) {
    throw new Error('Project is deleted');
  }
  return project;
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }
  if (project.isDeleted) {
    throw new Error('Project is deleted');
  }

  return await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

// Toggle project featured status
const toggleProjectFeatured = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }
  if (project.isDeleted) {
    throw new Error('Project is deleted');
  }

  const result = Project.findByIdAndUpdate(id, {
    isFeatured: !project.isFeatured,
  });
  return result;
};

const deleteProject = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }
  const result = await Project.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

// Dont Get deleted projects
const getAllProjects = async (query: Record<string, unknown>) => {
  const projectsQuery = new QueryBuilder(
    Project.find({ isDeleted: false }),
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

export const projectServices = {
  createProject,
  getSingleProject,
  updateProject,
  toggleProjectFeatured,
  deleteProject,
  getAllProjects,
};
