import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './Error/AppError';
import { verify } from 'jsonwebtoken';

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new AppError(400, 'Nao autorizado!');

  const token = authorization.split(' ')[1];

  const { sub } = verify(token, process.env.JWT_PASS ?? '') as IPayload;

  if (!sub) throw new AppError(400, 'Nao autorizado!');

  req.user = {
    id: sub,
  };

  return next();
};
