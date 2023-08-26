import { Router } from 'express';
import { StudentController } from './../app/controllers/StudentController';

const routesStudent = Router();
routesStudent.get('/', StudentController.index);
routesStudent.get('/:ra', StudentController.show);
routesStudent.post('/', StudentController.create);
routesStudent.delete('/:ra', StudentController.delete);
routesStudent.patch('/:ra', StudentController.update);

export default routesStudent;
