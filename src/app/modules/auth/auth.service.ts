import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../helpers/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const login = async (payload: ILoginUser) => {
  //check if the email exists in the database
  const user = await User.findOne({ email: payload.email });
  // Check if user exists
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  //Check if password matches
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid Password');
  }
  // define jwt payload
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  // create token
  const token = createToken(
    jwtPayload,
    config.jwt_token_secret as string,
    config.jwt_token_expires_in as string,
  );

  return {
    token,
  };
};

export const authServices = {
  login,
};
