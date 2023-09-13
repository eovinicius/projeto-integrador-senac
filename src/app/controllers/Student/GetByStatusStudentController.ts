import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { z } from 'zod';

const bodySchema = z.object({
  status: z.boolean().nullable(),
});

export class GetByStatusStudentController {
  static async handle(req: Request, res: Response) {
    const { status } = req.body;

    const validation = bodySchema.safeParse({ status });
    if (!validation.success) throw new AppError(403, 'status incorreto ou nao informado!');

    const student = await prisma.student.findMany({ where: { estatus: status } });

    return res.status(200).json(student);
  }
}
