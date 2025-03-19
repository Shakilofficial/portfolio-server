import config from '.';
import { User } from '../modules/user/user.model';

const adminUser = {
  email: 'mrshakilhossain@outlook.com',
  password: config.admin_password,
  name: 'Shakil Hossain',
  role: 'admin',
  profileImage:
    'https://res.cloudinary.com/dcyupktj6/image/upload/v1739528178/67af17716f52456e99272889-profile.PNG.png',
};

const seedAdmin = async () => {
  const isAdminExists = await User.findOne({ role: 'admin' });

  if (!isAdminExists) {
    await User.create(adminUser);
  }
};

export default seedAdmin;
