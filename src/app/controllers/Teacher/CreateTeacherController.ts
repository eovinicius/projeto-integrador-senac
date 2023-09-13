import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { genSalt, hash } from 'bcrypt';
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  user: z.string().nullable(),
  password: z.string(),
  confirmPassword: z.string(),
});

export class CreateTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, user, password, confirmPassword } = req.body;

    const validation = bodySchema.safeParse({ name, user, password, confirmPassword });
    if (!validation.success) throw new AppError(403, 'Preencha os campos corretamente!');

    if (password != confirmPassword) {
      throw new AppError(400, 'As senhas nao se coincidem !');
    }

    const verifyTeacherExists = await prisma.teacher.findUnique({ where: { user } });

    if (verifyTeacherExists) {
      throw new AppError(404, 'Usuario ja cadastrado no sistema!');
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const teacher = await prisma.teacher.create({ data: { name, user, password: passwordHash } });

    return res.status(201).json(teacher);
  }
}
