import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// Middlewares
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(cookieParser());
app.use(express.json());

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

export default app;
