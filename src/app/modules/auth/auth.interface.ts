import { UserRole } from '../user/user.interface';

export interface IAuth {
  email: string;
  password: string;
}

export interface IJwtPayload {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  role: UserRole;
}
