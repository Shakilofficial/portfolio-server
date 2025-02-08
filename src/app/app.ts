import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

// Middlewares
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(cookieParser());
app.use(express.json());

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: '🌐 Server is live 🚀',
  });
});

export default app;
