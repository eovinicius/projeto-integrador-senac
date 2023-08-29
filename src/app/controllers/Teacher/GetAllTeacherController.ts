import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';

export class GetAllTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const teacher = await prisma.teacher.findMany();
    return res.status(200).json(teacher);
  }
}
