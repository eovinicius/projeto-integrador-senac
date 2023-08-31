import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByStatusCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { estatus } = req.body;

    if (estatus != 'active' && estatus != 'inactive') {
      throw new AppError(400, 'status infomado incorretamente!');
    }

    const course = await prisma.course.findMany({ where: { estatus } });

    if (!course) throw new AppError(404, 'curso nao encostrado!');

    return res.status(200).json(course);
  }
}
