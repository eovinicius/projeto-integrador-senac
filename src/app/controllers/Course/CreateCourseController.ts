import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { Status } from '@prisma/client';

interface ICreateCourse {
  name: string;
  description: string;
  estatus: Status;
}

export class CreateCourseController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, estatus }: ICreateCourse = req.body;

    if (estatus != 'active' && estatus != 'inactive') {
      throw new AppError(400, 'status errado!');
    }
    if (!name || !description || !estatus) {
      throw new AppError(400, 'preencha todos os campos!');
    }

    const verifyCourseExists = await prisma.course.findUnique({ where: { name } });

    if (verifyCourseExists) {
      throw new AppError(404, 'curso ja cadastrado no sistema!');
    }

    const course = await prisma.course.create({ data: { name, description, estatus } });

    return res.status(201).json(course);
  }
}
