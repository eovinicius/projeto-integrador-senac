import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

export class GetDocumentationController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { ra_student, semesterYear } = req.body;

    if (!ra_student || !semesterYear) {
      const documentation = await prisma.documentation.findMany();
      return res.status(200).json(documentation);
    }

    const documentation = await prisma.documentation.findFirst({ where: { semesterYear, ra_student } });
    if (!documentation) throw new AppError(403, 'docomentacao nao existe!');

    return res.status(200).json(documentation);
  }
}
