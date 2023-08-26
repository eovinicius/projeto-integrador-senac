import 'dotenv/config';
import { Request, Response } from 'express';
import { prisma } from '../../repositories/prismaCliente';
import { AppError } from '../middlewares/Error/AppError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class TeacherController {
  // get all
  static async index(req: Request, res: Response): Promise<Response> {
    const teacher = await prisma.teacher.findMany();
    return res.status(200).json(teacher);
  }

  // get by id
  static async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    const teacher = await prisma.teacher.findUnique({ where: { id: ide } });
    return res.status(200).json(teacher);
  }

  // create
  static async create(req: Request, res: Response): Promise<Response> {
    const { name, user, password, confirmPassword } = req.body;

    if (!name || !user || !password || !confirmPassword) {
      throw new AppError(400, 'preencha todos os campos!');
    }

    if (password != confirmPassword) {
      throw new AppError(400, 'As senhas nao se coincidem !');
    }

    const verifyTeacherExists = await prisma.teacher.findUnique({ where: { user } });

    if (verifyTeacherExists) {
      throw new AppError(404, 'Usuario ja cadastrado no sistema!');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const teacher = await prisma.teacher.create({ data: { name, user, password: passwordHash } });

    return res.status(201).json(teacher);
  }

  // delete
  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);

    await prisma.teacher.delete({ where: { id: ide } });

    return res.status(204).json({ message: 'Professor excluido com sucesso!' });
  }

  //update
  static async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ide = Number(id);
    const { name, user, currentPassword, newPassword, confirmNewPassword } = req.body;

    const teacher = await prisma.teacher.findUnique({ where: { user } });

    if (teacher && teacher.id != ide) {
      throw new AppError(400, 'usuario ja cadastrado!');
    }

    if (newPassword != confirmNewPassword) {
      throw new AppError(400, 'As senhas nao se coincidem !');
    }

    if (teacher) {
      const comparePassword = bcrypt.compare(currentPassword, teacher.password);
      if (!comparePassword) {
        throw new AppError(400, 'senha atual invalida');
      }
    }

    if (currentPassword === newPassword) {
      throw new AppError(400, 'a nova senha nao pode ser igual a anterior');
    }

    await prisma.teacher.update({ where: { id: ide }, data: { name, user, password: newPassword } });
    return res.status(204).json({ message: 'Usuario atualizado com sucesso!' });
  }

  //login
  static async login(req: Request, res: Response) {
    const { user, password } = req.body;

    const username = await prisma.teacher.findUnique({ where: { user } });

    if (!username) {
      throw new AppError(200, 'usuario ou senha invalidos');
    }

    if (!(await bcrypt.compare(password, username.password))) throw new AppError(400, 'usuario ou senha invalidos');

    const token = jwt.sign({ id: username.id, name: username.name }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userLogin } = username;

    return res.status(200).json({
      user: userLogin,
      token: token,
    });
  }
}
