import { Request, Response } from 'express';
import { prisma } from '../../repositories/prismaCliente';
import { AppError } from '../middlewares/Error/AppError';

export class CourseController {
  // get all
  static async index(req: Request, res: Response): Promise<Response> {
    const course = await prisma.course.findMany();
    return res.status(200).json(course);
  }

  // get by id
  static async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const course = await prisma.course.findUnique({ where: { id: ide } });

    if (!course) throw new AppError(404, 'curso nao encostrado!');

    return res.status(200).json(course);
  }

  static async getByStatus(req: Request, res: Response): Promise<Response> {
    const { estatus } = req.body;

    const course = await prisma.course.findMany({ where: { estatus } });

    if (!course) throw new AppError(404, 'curso nao encostrado!');

    return res.status(200).json(course);
  }

  // create
  static async create(req: Request, res: Response): Promise<Response> {
    const { name, description, estatus } = req.body;

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

  // delete
  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const verifyCourseExists = await prisma.course.findUnique({ where: { id: ide } });
    if (!verifyCourseExists) {
      throw new AppError(404, 'curso nao encostrado!');
    }
    await prisma.course.update({ where: { id: ide }, data: { estatus: 'inactive' } });

    return res.status(204).json({ message: 'Curso excluido com sucesso!' });
  }

  //update
  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);
    const { description } = req.body;

    const verifyCourseExists = await prisma.course.findUnique({ where: { id: ide } });

    if (!verifyCourseExists) {
      throw new AppError(404, 'curso nao encostrado!');
    }

    await prisma.course.update({ where: { id: ide }, data: { description } });
    return res.status(204).json({ message: 'Usuario atualizado com sucesso!' });
  }
}
