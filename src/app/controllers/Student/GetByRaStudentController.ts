import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByRaStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;

    const student = await prisma.student.findUnique({ where: { ra } });

    if (!student) throw new AppError(404, 'aluno nao encostrado!');

    return res.status(200).json(student);
  }
}
