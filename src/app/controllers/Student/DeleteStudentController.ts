import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;
    const { id } = req.user;

    const student = await prisma.student.findUnique({ where: { ra } });

    if (!student) throw new AppError(404, 'aluno nao encostrado!');

    if (student.estatus === false) throw new AppError(403, 'Aluno ja esta desativado');

    const teacher = await prisma.teacher.findUnique({ where: { id } });

    if (!teacher) throw new AppError(403, 'professor nao encontrado!');

    const courseTeacher = await prisma.courseTeacher.findFirst({
      where: {
        id_course: student.id_course,
        id_teacher: teacher.id,
      },
    });

    if (!courseTeacher) {
      throw new AppError(401, 'Professor não está associado a este curso');
    }

    await prisma.student.update({ where: { ra }, data: { estatus: false } });

    return res.status(204).send({ message: 'Aluno excluido com sucesso!' });
  }
}
