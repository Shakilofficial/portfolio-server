import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../interface/IImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { skillServices } from './skill.service';

const createSkill = catchAsync(async (req, res) => {
  const result = await skillServices.createSkill(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Skill created successfully!',
    data: result,
  });
});

const categoryWiseAllSkills = catchAsync(async (req, res) => {
  const result = await skillServices.categoryWiseAllSkills();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skills retrieved successfully!',
    data: result,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await skillServices.getAllSkills(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skills retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSkill = catchAsync(async (req, res) => {
  const result = await skillServices.getSingleSkill(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skill retrieved successfully!',
    data: result,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const result = await skillServices.updateSkill(
    req.params.id,
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill updated successfully!',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const result = await skillServices.deleteSkill(
    req.params.id,
    req.user as IJwtPayload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill deleted successfully!',
    data: result,
  });
});

export const skillControllers = {
  createSkill,
  getAllSkills,
  categoryWiseAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
