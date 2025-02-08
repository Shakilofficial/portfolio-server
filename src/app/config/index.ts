import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  database_uri: process.env.DATABASE_URI,
  admin_password: process.env.ADMIN_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_token_secret: process.env.JWT_TOKEN_SECRET,
  jwt_token_expires_in: process.env.JWT_TOKEN_EXPIRES_IN,
};
