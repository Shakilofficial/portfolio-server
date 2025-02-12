import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app: Application = express();

// Middlewares
app.use(cors({ origin: 'https://shakil-tawny.vercel.app', credentials: true }));
app.use(cookieParser());
app.use(express.json());

// module routes
app.use('/api/v1', router);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    success: true,
    message: '🌐 Server is live 🚀',
  });
});

// Global error handler
app.use(globalErrorHandler);

// Not found route handler
app.use(notFound);

export default app;
