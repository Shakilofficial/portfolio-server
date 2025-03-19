import { model, Schema, Types } from 'mongoose';
import { projectCategories } from './project.constant';
import { IProject } from './project.interface';

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true },
    category: { type: String, enum: projectCategories, required: true },
    githubUrl: { type: String, default: null },
    liveUrl: { type: String, default: null },
    technologies: [{ type: Types.ObjectId, ref: 'Skill', default: [] }],
    isFeatured: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Project = model<IProject>('Project', projectSchema);
