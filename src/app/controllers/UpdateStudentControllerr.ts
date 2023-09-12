import { Request, Response } from 'express';
import { AppError } from '../middlewares/Error/AppError';
import { prisma } from '../../repositories/prismaCliente';

export class UpdateStudentControllerr {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;
    const { id_course, name } = req.body;

    if (id_course === '') {
      const student = await prisma.student.findUnique({ where: { ra } });

      if (!student) throw new AppError(403, 'aluno nao encontrado');

      await prisma.student.update({ where: { ra }, data: { name } });

      return res.status(204).json({ message: 'Aluno atualizado com sucesso!' });
    }

    if (name === '') {
      const student = await prisma.student.findUnique({ where: { ra } });

      if (!student) throw new AppError(403, 'aluno nao encontrado');

      if (!(await prisma.course.findUnique({ where: { id: id_course } }))) throw new AppError(400, 'curso nao existe!');

      await prisma.student.update({ where: { ra }, data: { id_course } });

      return res.status(204).json({ message: 'Aluno atualizado com sucesso!' });
    }

    const student = await prisma.student.findUnique({ where: { ra } });

    if (!student) throw new AppError(403, 'aluno nao encontrado');

    if (!(await prisma.course.findUnique({ where: { id: id_course } }))) throw new AppError(400, 'curso nao existe!');

    await prisma.student.update({ where: { ra }, data: { id_course, name } });

    return res.status(204).json({ message: 'Aluno atualizado com sucesso!' });
  }
}
