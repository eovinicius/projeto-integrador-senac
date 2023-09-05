import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class UpdateStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;
    const { id_course, name } = req.body;

    const student = await prisma.student.findUnique({ where: { ra } });

    if (!student) throw new AppError(403, 'aluno nao encontrado');

    if (student && student.ra != ra) {
      throw new AppError(400, 'Aluno ja cadastrado!');
    }

    if (!(await prisma.course.findUnique({ where: { id: id_course } }))) throw new AppError(400, 'curso nao existe!');

    await prisma.student.update({ where: { ra }, data: { id_course, name } });

    return res.status(204).json({ message: 'Aluno atualizado com sucesso!' });
  }
}
