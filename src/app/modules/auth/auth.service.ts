/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../helpers/AppError';
import { User } from '../user/user.model';
import { IAuth, IJwtPayload } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email });
    // Check if user exists
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    //Check if password matches
    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid Password');
    }

    const jwtPayload: IJwtPayload = {
      id: user._id.toString(),
      name: user.name as string,
      email: user.email as string,
      profileImage: user.profileImage as string,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err: any) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Invalid Refresh Token',
      err.message,
    );
  }

  const { id } = verifiedToken;

  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  const jwtPayload: IJwtPayload = {
    id: id.toString(),
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    profileImage: isUserExist.profileImage as string,
    role: isUserExist.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
