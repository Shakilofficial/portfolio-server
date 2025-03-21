/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../helpers/AppError';
import handleCastError from '../helpers/handleCastError';
import handleDuplicateError from '../helpers/handleDuplicateError';
import handleValidationError from '../helpers/handleValidationError';
import handleZodError from '../helpers/handleZodError';
import { TErrorSources } from '../types/error';

// Global error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Set default values for status code, message and errorSources
  let statusCode = 500;
  let message = 'Internal Server Error 💥';
  let errorSources: TErrorSources = [
    { path: '', message: 'An unexpected error occurred' },
  ];

  // Error handling by type
  if (err instanceof ZodError) {
    ({ statusCode, message, errorSources } = handleZodError(err));
  } else if (err?.name === 'ValidationError') {
    ({ statusCode, message, errorSources } = handleValidationError(err));
  } else if (err?.name === 'CastError') {
    ({ statusCode, message, errorSources } = handleCastError(err));
  } else if (err?.code === 11000) {
    ({ statusCode, message, errorSources } = handleDuplicateError(err));
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    //Send stack trace only in development environment
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default globalErrorHandler;
