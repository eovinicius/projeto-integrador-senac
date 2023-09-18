import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import { ZodError } from 'zod';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ status: 'Error', message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ status: 'validation error', message: error.format() });
  }

  console.log(error.message);
  return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });

  return next();
};
