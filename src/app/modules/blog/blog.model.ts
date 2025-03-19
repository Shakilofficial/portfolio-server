import { model, Schema } from 'mongoose';
import { BlogCategory, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, trim: true },
    category: {
      type: String,
      enum: Object.values(BlogCategory),
      required: true,
    },
    content: { type: String, required: true },
    thumbnail: {
      type: String,
      default:
        'https://mailrelay.com/wp-content/uploads/2018/03/que-es-un-blog-1.png',
    },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre<IBlog>('validate', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

export const Blog = model<IBlog>('Blog', blogSchema);
