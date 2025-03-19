import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/AppError';
import { IImageFile } from '../../interface/IImageFile';
import { IJwtPayload } from '../auth/auth.interface';
import { ISkill } from './skill.interface';
import { Skill } from './skill.model';

const createSkill = async (
  payload: Partial<ISkill>,
  icon: IImageFile,
  user: IJwtPayload,
) => {
  if (icon && icon.path) {
    payload.icon = icon.path;
  }

  const skill = new Skill({
    ...payload,
    createdBy: user.id,
  });
  const result = await skill.save();

  return result;
};

const categoryWiseAllSkills = async () => {
  const skills = await Skill.aggregate([
    {
      $group: {
        _id: '$category',
        skills: {
          $push: {
            _id: '$_id',
            name: '$name',
            icon: '$icon',
            createdBy: '$createdBy',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        skills: 1,
      },
    },
  ]);

  return skills;
};

const getAllSkills = async (query: Record<string, unknown>) => {
  const skillsQuery = new QueryBuilder(Skill.find(), query)
    .search(['name'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = await skillsQuery.modelQuery;
  const meta = await skillsQuery.countTotal();
  return { result, meta };
};

const getSingleSkill = async (id: string) => {
  const skill = await Skill.findById(id);

  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found');
  }

  return skill;
};

const updateSkill = async (
  id: string,
  payload: Partial<ISkill>,
  icon: IImageFile,
  user: IJwtPayload,
) => {
  if (icon && icon.path) {
    payload.icon = icon.path;
  }

  const skill = await Skill.findById(id);

  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found');
  }

  if (skill.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to update this skill',
    );
  }

  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('createdBy', 'name email profileImage');

  return result;
};

const deleteSkill = async (id: string, user: IJwtPayload) => {
  const skill = await Skill.findById(id);

  if (!skill) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found');
  }

  if (skill.createdBy.toString() !== user.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not allowed to delete this skill',
    );
  }

  return await skill.deleteOne();
};

export const skillServices = {
  createSkill,
  categoryWiseAllSkills,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
