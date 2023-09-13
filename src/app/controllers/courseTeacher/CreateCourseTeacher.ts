import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class CreateCourseTeacher {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id_course, id_teacher, estatus } = req.body;

    if (!id_course || !id_teacher || !estatus) {
      throw new AppError(400, 'preencha todos os campos!');
    }

    const course = await prisma.course.findFirst({ where: { id: id_course } });
    if (!course) throw new AppError(403, 'Curso invalido!');

    const teacher = await prisma.teacher.findFirst({ where: { id: id_teacher } });
    if (!teacher) throw new AppError(403, 'professor invalido!');

    

    const courseTeacher = await prisma.courseTeacher.create({ data: { id_course, id_teacher, estatus } });

    return res.status(201).json(courseTeacher);
  }
}
