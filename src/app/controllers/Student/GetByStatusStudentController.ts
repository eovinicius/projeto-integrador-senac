import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByStatusStudentController {
  async handle(req: Request, res: Response) {
    const { estatus } = req.body;

    if (estatus != true && estatus != false) throw new AppError(403, 'status infomado incorretamente!');

    const student = await prisma.student.findMany({ where: { estatus } });

    return res.status(200).json(student);
  }
}
