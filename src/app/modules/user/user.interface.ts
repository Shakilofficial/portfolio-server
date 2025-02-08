export interface IUser {
  email: string;
  password: string;
  role: string;
  name: string;
  profileImage?: string;
}

export type TUserRole = 'admin';
