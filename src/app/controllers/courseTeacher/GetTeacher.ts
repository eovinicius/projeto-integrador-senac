import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetByIdCourseTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id_course, id_teacher } = req.body;

    const course = await prisma.course.findFirst({ where: { id: id_course } });
    if (!course) throw new AppError(403, 'Curso nao existe!');

    const teacher = await prisma.teacher.findFirst({ where: { id: id_teacher } });
    if (!teacher) throw new AppError(403, 'professor nao existe!');

    const courseTeachers = await prisma.courseTeacher.findMany();

    return res.status(200).json(courseTeachers);
  }
}
