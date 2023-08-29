import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './Error/AppError';
import { verify } from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new AppError(400, 'Nao autorizado!');

  const token = authorization.split(' ')[1];

  if (!verify(token, process.env.JWT_PASS ?? '')) throw new AppError(400, 'Nao autorizado!');

  return next();
};
