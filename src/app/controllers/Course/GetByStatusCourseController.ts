import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByStatusCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { estatus } = req.body;

    if (estatus != true && estatus != false) {
      throw new AppError(403, 'status infomado incorretamente!');
    }

    const course = await prisma.course.findMany({ where: { estatus } });

    return res.status(200).json(course);
  }
}
