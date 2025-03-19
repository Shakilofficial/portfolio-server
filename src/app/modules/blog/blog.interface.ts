/* eslint-disable no-unused-vars */
import { Document, Types } from 'mongoose';
// Interface for blog

export enum BlogCategory {
  WebDevelopment = 'Web Development',
  FrontendDevelopment = 'Frontend Development',
  BackendDevelopment = 'Backend Development',
  ProgrammingTips = 'Programming Tips',
  TechTutorials = 'Tech Tutorials',
  CareerDevelopment = 'Career Development',
  ProjectShowcases = 'Project Showcases',
  ToolsAndResources = 'Tools & Resources',
  DevOpsAndDeployment = 'DevOps & Deployment',
  IndustryNews = 'Industry News',
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  category: BlogCategory;
  content: string;
  thumbnail?: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
