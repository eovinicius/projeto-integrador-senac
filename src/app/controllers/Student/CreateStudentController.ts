import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { z } from 'zod';

const createSchema = z.object({
  ra: z.string(),
  id_course: z.number(),
  name: z.string(),
  status: z.boolean().nullable(),
});

export class CreateStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra, id_course, name, status } = req.body;

    const validation = createSchema.safeParse({ ra, id_course, name, status });
    if (!validation.success) throw new AppError(403, 'Preencha os campos corretamente!');

    const verifyStudentExists = await prisma.student.findFirst({ where: { ra } });
    if (verifyStudentExists) return res.status(403).json({ message: 'aluno ja cadastrado', status: verifyStudentExists.estatus === true ? 'ativado' : 'desativado' });

    if (!(await prisma.course.findUnique({ where: { id: id_course } }))) throw new AppError(403, 'Curso invalido ou inexistente');

    const student = await prisma.student.create({ data: { ra, id_course, name, estatus: status } });

    return res.status(201).json(student);
  }
}
