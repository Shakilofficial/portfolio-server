import { Types } from 'mongoose';

export type TSkillCategory =
  | 'Language'
  | 'Frontend'
  | 'Backend'
  | 'DevOps'
  | 'Tools';

export interface ISkill {
  name: string;
  icon: string;
  category: TSkillCategory;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
