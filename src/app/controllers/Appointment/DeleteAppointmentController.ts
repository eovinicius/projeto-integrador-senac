import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteAppointmentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { cod_appointment } = req.params;
    const cod = Number(cod_appointment);

    const appointment = await prisma.appointment.findUnique({ where: { cod_appointment: cod } });

    if (!appointment) throw new AppError(404, 'atentimento nao encostrado!');

    if (appointment.estatus === false) throw new AppError(403, 'atentimento ja esta desativado');

    await prisma.appointment.update({ where: { cod_appointment: cod }, data: { estatus: false } });

    return res.status(200).send({ message: 'atentimento excluido com sucesso!' });
  }
}
