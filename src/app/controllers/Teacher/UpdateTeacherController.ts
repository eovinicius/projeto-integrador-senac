import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';
import { compare } from 'bcrypt';

export class UpdateTeacherController {
  static async handle(req: Request, res: Response): Promise<Response> {
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
      const comparePassword = compare(currentPassword, teacher.password);
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
}
