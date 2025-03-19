import QueryBuilder from '../../builder/QueryBuilder';
import { IJwtPayload } from '../auth/auth.interface';
import { IExperience } from './experience.interface';
import { Experience } from './experience.model';

const createExperience = async (
  payload: Partial<IExperience>,
  user: IJwtPayload,
) => {
  const experience = new Experience({
    ...payload,
    createdBy: user.id,
  });
  const result = await experience.save();

  return result;
};

const getAllExperiences = async (query: Record<string, unknown>) => {
  const experienceQuery = new QueryBuilder(Experience.find(), query)
    .search(['title', 'company', 'position', 'location'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await experienceQuery.modelQuery;
  const meta = await experienceQuery.countTotal();
  return { result, meta };
};

const getSingleExperience = async (id: string) => {
  const experience = await Experience.findById(id);

  if (!experience) {
    throw new Error('Experience not found');
  }

  return experience;
};

const updateExperience = async (
  id: string,
  payload: Partial<IExperience>,
  user: IJwtPayload,
) => {
  const experience = await Experience.findById(id);

  if (!experience) {
    throw new Error('Experience not found');
  }

  if (experience.createdBy.toString() !== user.id) {
    throw new Error('You are not allowed to update this experience');
  }

  const result = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('createdBy', 'name email profileImage');

  return result;
};

const deleteExperience = async (id: string, user: IJwtPayload) => {
  const experience = await Experience.findById(id);

  if (!experience) {
    throw new Error('Experience not found');
  }

  if (experience.createdBy.toString() !== user.id) {
    throw new Error('You are not allowed to delete this experience');
  }

  return await experience.deleteOne();
};

export const experienceServices = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
