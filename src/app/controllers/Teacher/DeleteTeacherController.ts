import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const verifyTeacherExists = await prisma.teacher.findUnique({ where: { id: ide } });
    if (!verifyTeacherExists) throw new AppError(404, 'professor nao encostrado!');

    await prisma.teacher.delete({ where: { id: ide } });

    return res.status(204).json({ message: 'Professor excluido com sucesso!' });
  }
}
