import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByIdCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const course = await prisma.course.findUnique({ where: { id: ide } });

    if (!course) throw new AppError(404, 'curso nao encostrado!');

    return res.status(200).json(course);
  }
}
