export type TProjectCategory = 'frontend' | 'backend' | 'fullstack';

export interface IProject {
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  category: TProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  isFeatured: boolean;
  isDeleted: boolean;
}
