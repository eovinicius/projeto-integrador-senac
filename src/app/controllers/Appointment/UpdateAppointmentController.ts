import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class UpdateAppointmentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { cod_appointment } = req.params;
    const cod = Number(cod_appointment);
    const { ra_student, id_teacher, appointment_date, appointment_time, description } = req.body;

    const appointmentAlreadyExists = await prisma.appointment.findUnique({ where: { cod_appointment: cod } });
    if (!appointmentAlreadyExists) throw new AppError(400, 'atendimento nao existe');

    const student = await prisma.student.findFirst({ where: { ra: ra_student } });
    if (!student) throw new AppError(403, 'professor nao existe!');

    const teacher = await prisma.teacher.findFirst({ where: { id: id_teacher } });
    if (!teacher) throw new AppError(403, 'professor nao existe!');

    const appointment = await prisma.appointment.update({
      where: { cod_appointment: cod },
      data: {
        ra_student,
        id_teacher,
        appointment_date,
        appointment_time,
        description,
      },
    });
    return res.status(200).json(appointment);
  }
}
