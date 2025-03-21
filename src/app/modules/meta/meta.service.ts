import { JwtPayload } from 'jsonwebtoken';
import { Blog } from '../blog/blog.model';
import { Experience } from '../experience/experience.model';
import { Message } from '../message/message.model';
import { Project } from '../project/project.model';
import { Skill } from '../skill/skill.model';

const getMetaData = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const { startDate, endDate } = query;
  // Check if the user is an admin
  const isAdmin = user?.role === 'admin';
  // Get total counts for all main entities
  const [
    totalSkills,
    totalProjects,
    totalMessages,
    totalExperiences,
    totalBlogs,
  ] = await Promise.all([
    Skill.countDocuments(),
    Project.countDocuments(),
    Message.countDocuments(),
    Experience.countDocuments(),
    Blog.countDocuments(),
  ]);

  // Get recent activities
  const [recentMessages, recentProjects, recentBlogs] = await Promise.all([
    Message.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email message createdAt'),
    Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category createdAt isFeatured'),
    Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category isPublished isFeatured createdAt'),
  ]);

  // Get skills distribution by category
  const skillsByCategory = await Skill.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  // Get project distribution by category
  const projectsByCategory = await Project.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  return {
    counts: {
      skills: totalSkills,
      projects: totalProjects,
      messages: totalMessages,
      experiences: totalExperiences,
      blogs: totalBlogs,
    },
    distributions: {
      skills: skillsByCategory,
      projects: projectsByCategory,
    },
    recentActivities: {
      messages: recentMessages,
      projects: recentProjects,
      blogs: recentBlogs,
    },
    statusMetrics: {
      featuredProjects: await Project.countDocuments({ isFeatured: true }),
      publishedBlogs: await Blog.countDocuments({ isPublished: true }),
      featuredBlogs: await Blog.countDocuments({ isFeatured: true }),
    },
  };
};

export const metaServices = {
  getMetaData,
};
