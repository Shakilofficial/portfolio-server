import { Types } from 'mongoose';

export type TProjectCategory = 'frontend' | 'backend' | 'fullstack';

export interface IProject {
  _id?: Types.ObjectId;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  category: TProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: Types.ObjectId[];
  isFeatured: boolean;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
