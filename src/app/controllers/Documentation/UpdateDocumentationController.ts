import { Request, Response } from 'express';
import { prisma } from '../../../repositories/prismaCliente';
import { AppError } from '../../middlewares/Error/AppError';

interface IRequest {
  semesterYear: number;
  ra_student: string;
  tcer: number;
  tcernr: number;
  activityDescription: number;
  internshipValidationDate: number;
  activityReport: number;
  termination: number;
  equivalenceReport: number;
  observations: string;
}

export class CreateDocumentationController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { semesterYear, ra_student, tcer, tcernr, activityDescription, internshipValidationDate, activityReport, termination, equivalenceReport, observations }: IRequest = req.body;

    const documentation = await prisma.documentation.findFirst({ where: { semesterYear, ra_student } });

    if (documentation) throw new AppError(400, 'documentacao ja cadastrada!');

    const student = await prisma.student.findFirst({ where: { ra: ra_student } });
    if (!student) throw new AppError(403, 'aluno nao existe!');

    const newDocumentation = await prisma.documentation.update({where: {semesterYear, ra_student},
      data: {
        semesterYear,
        ra_student,
        tcer,
        tcernr,
        activityDescription,
        internshipValidationDate,
        activityReport,
        termination,
        equivalenceReport,
        observations,
      },
    });

    return res.status(201).json(newDocumentation);
  }
}
