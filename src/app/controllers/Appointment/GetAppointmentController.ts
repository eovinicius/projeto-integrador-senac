import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetAppointmentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { cod_appointment } = req.body;

    if (!cod_appointment) {
      const appointment = await prisma.appointment.findMany();
      return res.status(200).json(appointment);
    }

    const appointment = await prisma.appointment.findUnique({ where: { cod_appointment } });

    if (!appointment) throw new AppError(403, 'atendimento nao encostrado!');

    return res.status(200).json(appointment);
  }
}
