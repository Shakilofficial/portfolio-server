import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: false,
      default: '',
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Exclude __v field before returning user data to client
blogSchema.pre('find', function () {
  this.select('-__v');
});

// Exclude __v field for findOne,
blogSchema.pre('findOne', function () {
  this.select('-__v');
});

export const Blog = model<IBlog>('Blog', blogSchema);
