import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const login = catchAsync(async (req, res) => {
  // Get payload from request body
  const payload = req.body;
  // Login the user
  const result = await authServices.login(payload);

  // Send response with the token
  const { token } = result;
  res.cookie('token', token, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin logged in successfully',
    data: { token },
  });
});

export const authControllers = {
  login,
};
