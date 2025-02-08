import app from './app/app';
import config from './app/config';
import { connectDB } from './app/config/db';
import seedAdmin from './app/config/seedAdmin';

const start = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🏃🏽‍♂️➡️`);
    });
    await seedAdmin();
  } catch (error) {
    console.error('🚨 Failed to start the server ', error);
    process.exit(1);
  }
};

start();
