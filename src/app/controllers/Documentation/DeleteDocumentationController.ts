import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class DeleteDocumentationController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra_student, semesterYear } = req.body;

    const documentation = await prisma.documentation.findFirst({ where: { semesterYear, ra_student } });
    if (!documentation) throw new AppError(400, 'documentacao nao existe');

    await prisma.documentation.update({
      where: { ra_student, semesterYear },
      data: {
        estatus: false,
      },
    });

    return res.status(204).send();
  }
}
