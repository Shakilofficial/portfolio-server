import { model, Schema } from 'mongoose';
import { projectCategories } from './project.constant';
import { IProject } from './project.interface';

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, enum: projectCategories, required: true },
    githubUrl: { type: String, default: null },
    liveUrl: { type: String, default: null },
    technologies: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Project = model<IProject>('Project', projectSchema);
