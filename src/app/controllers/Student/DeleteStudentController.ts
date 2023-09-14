import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;
    const { id } = req.user;

    console.log(id);

    const student = await prisma.student.findUnique({ where: { ra } });

    if (!student) throw new AppError(404, 'aluno nao encostrado!');

    if (student.estatus === false) throw new AppError(403, 'Aluno ja esta desativado');

    await prisma.student.update({ where: { ra }, data: { estatus: false } });

    return res.status(204).send({ message: 'Aluno excluido com sucesso!' });
  }
}
