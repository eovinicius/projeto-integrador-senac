import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class ActiveStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;

    const verifyStudentExists = await prisma.student.findUnique({ where: { ra } });

    if (!verifyStudentExists) throw new AppError(404, 'aluno nao encostrado!');

    if (verifyStudentExists.estatus === true) throw new AppError(403, 'Aluno ja esta ativado');

    await prisma.student.update({ where: { ra }, data: { estatus: true } });

    return res.status(204).send({ message: 'Aluno ativado com sucesso!' });
  }
}
