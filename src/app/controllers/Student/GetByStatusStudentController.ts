import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByStatusStudentController {
  static async handle(req: Request, res: Response) {
    const { status } = req.body;

    if (status != true && status != false) throw new AppError(403, 'status infomado incorretamente!');

    const student = await prisma.student.findMany({ where: { estatus: status } });

    return res.status(200).json(student);
  }
}
