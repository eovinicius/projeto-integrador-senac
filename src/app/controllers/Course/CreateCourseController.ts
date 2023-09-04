import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string(),
  estatus: z.boolean().nullable(),
});

export class CreateCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, status } = req.body;

    // validacao do body
    const validationResult = createSchema.safeParse({ name, status });

    if (!validationResult.success) throw new AppError(403, 'verifique os dados de entrada');

    // verifica se o curso ja esta cadastrado
    const verifyCourseExists = await prisma.course.findUnique({ where: { name } });

    if (verifyCourseExists) {
      throw new AppError(403, 'curso ja cadastrado no sistema!');
    }

    // insere o curso no banco de dados
    const course = await prisma.course.create({ data: { name, estatus: status } });

    return res.status(201).json(course);
  }
}
