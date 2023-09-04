import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;

    const verifyStudentExists = await prisma.student.findUnique({ where: { ra } });

    if (!verifyStudentExists) throw new AppError(404, 'aluno nao encostrado!');

    await prisma.student.update({ where: { ra }, data: { estatus: false } });

    return res.status(204).send({ message: 'Aluno excluido com sucesso!' });
  }
}
