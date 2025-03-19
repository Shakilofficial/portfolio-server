import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import os from 'os';

import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app: Application = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(cookieParser());
app.use(express.json());

// module routes
app.use('/api/v1', router);
// 📌 API Metadata
const API_METADATA = {
  name: 'Shakils Portfolio API',
  version: '1.0.0',
  description:
    'This is the API for the Shakils Portfolio website. It provides various endpoints for fetching data from the database.',
  author: {
    name: 'Md Shakil Hossain',
    email: 'mrshakilhossain@outlook.com',
    portfolio: 'https://shakil-tawny.vercel.app',
  },
};

// 🚀 API Health Check & Metadata Route
app.get('/', (req: Request, res: Response) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Welcome to the Shakils Portfolio API! 🎉',
    apiInfo: API_METADATA,
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor((serverUptime / 60) % 60)} minutes`,
    },
  });
});

// Global error handler
app.use(globalErrorHandler);

// Not found route handler
app.use(notFound);

export default app;
