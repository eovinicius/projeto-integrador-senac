import { Router } from 'express';
import { GetAllStudentController } from '../app/controllers/Student/GetAllStudentController';
import { GetByRaStudentController } from '../app/controllers/Student/GetByRaStudentController';
import { CreateStudentController } from '../app/controllers/Student/CreateStudentController';
import { DeleteStudentController } from '../app/controllers/Student/DeleteStudentController';
import { ActiveStudentController } from '../app/controllers/Student/ActiveStudentController';
import { GetByStatusStudentController } from '../app/controllers/Student/GetByStatusStudentController';
import { UpdateStudentController } from '../app/controllers/Student/UpdateStudentController';
import { UpdateStudentControllerr } from '../app/controllers/UpdateStudentControllerr';

const routesStudent = Router();
routesStudent.get('/', GetAllStudentController.handle);
routesStudent.get('/:ra', GetByRaStudentController.handle);
routesStudent.get('/por/status', GetByStatusStudentController.handle);
routesStudent.post('/', CreateStudentController.handle);
routesStudent.delete('/active/:ra', ActiveStudentController.handle);
routesStudent.delete('/:ra', DeleteStudentController.handle);
routesStudent.patch('/:ra', UpdateStudentControllerr.handle);
export default routesStudent;
