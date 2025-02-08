import mongoose from 'mongoose';
// Interface for blog
export interface IBlog {
  title: string;
  content: string;
  coverImage?: string;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  isFeatured: boolean;
}
