import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';

export class GetAllCourseController {
  // get all
  static async handle(req: Request, res: Response): Promise<Response> {
    const course = await prisma.course.findMany();
    return res.status(200).json(course);
  }
}
