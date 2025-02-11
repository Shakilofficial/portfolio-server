import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { projectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const userId = req.user?.id as JwtPayload;
  const payload = { ...req.body, owner: userId };
  const result = await projectServices.createProject(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

// Update an existing project
const updateProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await projectServices.updateProject(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

// toggle project featured status
const toggleProjectFeatured = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await projectServices.toggleProjectFeatured(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project featured status toggled successfully',
    data: result,
  });
});

// Delete a project (soft delete)
const deleteProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  await projectServices.deleteProject(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project deleted successfully',
  });
});

// Get a single project
const getSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await projectServices.getSingleProject(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project retrieved successfully',
    data: result,
  });
});

// Get all projects (excluding deleted ones)
const getAllProjects = catchAsync(async (req, res) => {
  const result = await projectServices.getAllProjects(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Projects retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const projectControllers = {
  createProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
  getSingleProject,
  getAllProjects,
};
