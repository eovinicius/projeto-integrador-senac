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

  if (!token) throw new AppError(400, 'Nao autorizado!');

  const { sub } = verify(token, '123@123') as IPayload;

  if (!sub) throw new AppError(400, 'Nao autorizado!');

  const id = Number(sub);

  req.user = {
    id,
  };

  return next();
};
