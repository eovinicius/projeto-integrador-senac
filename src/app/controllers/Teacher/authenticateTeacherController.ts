import 'dotenv/config';
import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';

const bodySchema = z.object({
  user: z.string(),
  password: z.string(),
});

export class authenticateTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { user, password } = req.body;

    const validation = bodySchema.safeParse({ user, password });
    if (!validation.success) throw new AppError(403, 'Preencha os campos corretamente!');

    const teacher = await prisma.teacher.findUnique({ where: { user } });

    if (!teacher) throw new AppError(401, 'usuario ou senha invalido!');

    const verifyPasswordHash = compare(password, teacher.password);

    if (!verifyPasswordHash) throw new AppError(401, 'usuario ou senha invalido!');

    const { id } = teacher;

    const token = sign({}, '123@123', {
      subject: id.toString(),
      expiresIn: '1d',
    });

    const tokenReturn = {
      token,
      user: {
        user: teacher.user,
      },
    };

    return res.status(200).json(tokenReturn);
  }
}
