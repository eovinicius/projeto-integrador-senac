import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './Error/AppError';
import { verify } from 'jsonwebtoken';
import { prisma } from '../../repositories/prismaCliente';

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new AppError(400, 'Nao autorizado!');

  const token = authorization.split(' ')[1];

  const { id } = verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

  const user = await prisma.teacher.findUnique({ where: { id } });

  if (!user) throw new AppError(400, 'Nao autorizado!');

  const { password, ...loggedUser } = user;

  return next();
};
