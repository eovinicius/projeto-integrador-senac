import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

interface IRequest {
  ra_student: string;
  id_teacher: number;
  appointment_date: Date;
  appointment_time: Date;
  description: string;
  estatus: boolean;
}

export class CreateCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra_student, id_teacher, appointment_date, appointment_time, description, estatus }: IRequest = req.body;

    const student = await prisma.student.findFirst({ where: { ra: ra_student } });
    if (!student) throw new AppError(403, 'professor nao existe!');

    const teacher = await prisma.teacher.findFirst({ where: { id: id_teacher } });
    if (!teacher) throw new AppError(403, 'professor nao existe!');

    const appointment = await prisma.appointment.create({
      data: {
        ra_student,
        id_teacher,
        appointment_date,
        appointment_time,
        description,
        estatus,
      },
    });
    return res.status(201).json(appointment);
  }
}
