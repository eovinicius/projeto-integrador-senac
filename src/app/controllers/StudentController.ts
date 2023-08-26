import { Request, Response } from 'express';
import { prisma } from '../../repositories/prismaCliente';
import { AppError } from '../middlewares/Error/AppError';

export class StudentController {
  // get all
  static async index(req: Request, res: Response): Promise<Response> {
    const students = await prisma.student.findMany();
    return res.status(200).json(students);
  }

  // get by ra
  static async show(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;
    const student = await prisma.student.findUnique({ where: { ra } });
    return res.status(200).json(student);
  }

  // create
  static async create(req: Request, res: Response): Promise<Response> {
    const { ra, id_course, name, estatus } = req.body;

    const verifyStudentExists = await prisma.student.findFirst({ where: { ra } });
    if (verifyStudentExists) throw new AppError(400, 'Aluno ja cadastrado');

    const student = await prisma.student.create({ data: { ra, id_course, name, estatus } });

    return res.status(201).json(student);
  }

  // delete
  static async delete(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;

    await prisma.student.delete({ where: { ra } });

    return res.status(204).send({ message: 'Aluno excluido com sucesso!' });
  }

  //update
  static async update(req: Request, res: Response): Promise<Response> {
    const { ra } = req.params;
    const { id_course, name, estatus } = req.body;

    const teacher = await prisma.student.findUnique({ where: { ra } });

    if (teacher && teacher.ra != ra) {
      throw new AppError(400, 'Aluno ja cadastrado!');
    }

    if (!(await prisma.course.findUnique({ where: { id: id_course } }))) throw new AppError(400, 'curso nao existe!');

    await prisma.student.update({ where: { ra }, data: { id_course, name, estatus } });
    return res.status(204).json({ message: 'Aluno atualizado com sucesso!' });
  }
}
