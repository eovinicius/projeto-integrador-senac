import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class CreateStudentController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra, id_course, name, estatus } = req.body;

    const verifyStudentExists = await prisma.student.findFirst({ where: { ra } });
    if (verifyStudentExists) throw new AppError(400, 'Aluno ja cadastrado');

    const student = await prisma.student.create({ data: { ra, id_course, name, estatus } });

    return res.status(201).json(student);
  }
}
