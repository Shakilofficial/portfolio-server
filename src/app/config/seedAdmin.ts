import config from '.';
import { User } from '../modules/user/user.model';

const adminUser = {
  email: 'admin@example.com',
  password: config.admin_password,
  name: 'Shakil Hossain',
  role: 'admin',
  profileImage:
    'https://res.cloudinary.com/dcyupktj6/image/upload/v1738080859/6797c96fe7fb440b9691a104-images.jpeg.jpg',
};

const seedAdmin = async () => {
  const isAdminExists = await User.findOne({ role: 'admin' });

  if (!isAdminExists) {
    await User.create(adminUser);
  }
};

export default seedAdmin;
