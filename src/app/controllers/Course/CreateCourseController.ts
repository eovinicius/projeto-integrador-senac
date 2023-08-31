import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class CreateCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    let estatus = req.body.estatus;

    if (!estatus) estatus = 'active';

    if (estatus != 'active' && estatus != 'inactive') {
      throw new AppError(400, 'status infomado incorretamente!');
    }
    if (!name || !estatus) {
      throw new AppError(400, 'preencha todos os campos!');
    }

    const verifyCourseExists = await prisma.course.findUnique({ where: { name } });

    if (verifyCourseExists) {
      throw new AppError(404, 'curso ja cadastrado no sistema!');
    }

    const course = await prisma.course.create({ data: { name } });

    return res.status(201).json(course);
  }
}
