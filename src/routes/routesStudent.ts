import { Router } from 'express';
import { GetAllStudentController } from '../app/controllers/Student/GetAllStudentController';
import { GetByRaStudentController } from '../app/controllers/Student/GetByRaStudentController';
import { CreateStudentController } from '../app/controllers/Student/CreateStudentController';
import { DeleteStudentController } from '../app/controllers/Student/DeleteStudentController';
import { UpdateStudentController } from '../app/controllers/Student/UpdateStudentController';

const routesStudent = Router();
routesStudent.get('/', GetAllStudentController.handle);
routesStudent.get('/:ra', GetByRaStudentController.handle);
routesStudent.post('/', CreateStudentController.handle);
routesStudent.delete('/:ra', DeleteStudentController.handle);
routesStudent.patch('/:ra', UpdateStudentController.handle);

export default routesStudent;
