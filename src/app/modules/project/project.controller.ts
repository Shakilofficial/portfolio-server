import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { projectServices } from './project.service';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.createProject(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Project created successfully!',
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.updateProject(
    req.params.id,
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully!',
    data: result,
  });
});

const toggleProjectFeatured = catchAsync(
  async (req: Request, res: Response) => {
    const result = await projectServices.toggleProjectFeatured(
      req.params.id,
      req.user as IJwtPayload,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Project featured status updated successfully!',
      data: result,
    });
  },
);

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getSingleProject(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project retrieved successfully!',
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.getAllProjects(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Projects retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await projectServices.deleteProject(
    req.params.id,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project deleted successfully!',
    data: result,
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
