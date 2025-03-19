import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { experienceServices } from './experience.service';

const createExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.createExperience(
    req.body,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Experience added successfully!',
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req, res) => {
  const result = await experienceServices.getAllExperiences(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Experiences retrieved successfully!',
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.getSingleExperience(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Experience retrieved successfully!',
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.updateExperience(
    req.params.id,
    req.body,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Experience updated successfully!',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const result = await experienceServices.deleteExperience(
    req.params.id,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Experience deleted successfully!',
    data: result,
  });
});

export const experienceControllers = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
