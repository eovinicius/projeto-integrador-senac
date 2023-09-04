import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class UpdateCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);
    const { name } = req.body;

    const verifyCourseExists = await prisma.course.findUnique({ where: { id: ide } });

    if (!verifyCourseExists) {
      throw new AppError(403, 'curso nao encostrado!');
    }

    await prisma.course.update({ where: { id: ide }, data: { name } });
    return res.status(204).json({ message: 'Usuario atualizado com sucesso!' });
  }
}
