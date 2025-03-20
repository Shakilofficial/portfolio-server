import { Types } from 'mongoose';

export interface IExperience {
  _id?: Types.ObjectId;
  title: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
