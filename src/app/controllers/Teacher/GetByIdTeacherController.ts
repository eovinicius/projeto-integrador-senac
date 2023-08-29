import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByIdTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const teacher = await prisma.teacher.findUnique({ where: { id: ide } });

    if (!teacher) throw new AppError(404, 'professor nao encostrado!');

    return res.status(200).json(teacher);
  }
}
