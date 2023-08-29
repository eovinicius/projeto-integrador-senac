import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const verifyCourseExists = await prisma.course.findUnique({ where: { id: ide } });
    if (!verifyCourseExists) {
      throw new AppError(404, 'curso nao encostrado!');
    }
    await prisma.course.update({ where: { id: ide }, data: { estatus: 'inactive' } });

    return res.status(204).json({ message: 'Curso excluido com sucesso!' });
  }
}
