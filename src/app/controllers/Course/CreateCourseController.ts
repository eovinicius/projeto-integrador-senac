import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { z } from 'zod';

const bodySchema = z.object({
  name: z.string(),
  status: z.boolean().nullable(),
});

export class CreateCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, status } = req.body;

    const validation = bodySchema.safeParse({ name, status });
    if (!validation.success) throw new AppError(403, 'Preencha os campos corretamente!');

    const verifyCourseExists = await prisma.course.findUnique({ where: { name } });

    if (verifyCourseExists) {
      throw new AppError(403, 'curso ja cadastrado no sistema!');
    }

    const course = await prisma.course.create({ data: { name, estatus: status } });

    return res.status(201).json(course);
  }
}
