import { Router } from 'express';
import { GetAllTeacherController } from '../app/controllers/Teacher/GetAllTeacherController';
import { GetByIdTeacherController } from '../app/controllers/Teacher/GetByIdTeacherController';
import { CreateTeacherController } from '../app/controllers/Teacher/CreateTeacherController';
import { DeleteTeacherController } from './../app/controllers/Teacher/DeleteTeacherController';
import { UpdateTeacherController } from '../app/controllers/Teacher/UpdateTeacherController';
import { authenticateTeacherController } from '../app/controllers/Teacher/authenticateTeacherController';

const routesTeacher = Router();

routesTeacher.get('/', GetAllTeacherController.handle);
routesTeacher.get('/:id', GetByIdTeacherController.handle);
routesTeacher.post('/', CreateTeacherController.handle);
routesTeacher.delete('/:id', DeleteTeacherController.handle);
routesTeacher.patch('/:id', UpdateTeacherController.handle);


//session
routesTeacher.post('/session/login', authenticateTeacherController.handle);

export default routesTeacher;
