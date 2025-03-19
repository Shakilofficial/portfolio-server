/* eslint-disable no-unused-vars */
export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  profileImage: string;
}

export enum UserRole {
  ADMIN = 'admin',
}
