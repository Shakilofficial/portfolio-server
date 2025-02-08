export type TProjectCategory = 'frontend' | 'backend' | 'fullstack';

export interface IProject {
  title: string;
  description: string;
  coverImage: string;
  category: TProjectCategory;
  isFeatured: boolean;
  isDeleted: boolean;
}
