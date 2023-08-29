import { Teacher } from '@prisma/client';

declare global {
  namespace Express {
    export interface Request extends Request {
      user: Partial<Teacher>;
    }
  }
}
