import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';

export class GetAllStudentController {
  // get all
  static async handle(req: Request, res: Response): Promise<Response> {
    const students = await prisma.student.findMany();
    return res.status(200).json(students);
  }
}
