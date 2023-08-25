import { Router } from 'express';
import { TeacherController } from '../app/controllers/TeacherController';

const routesTeacher = Router();

routesTeacher.get('/', TeacherController.index);
routesTeacher.get('/:id', TeacherController.show);
routesTeacher.post('/', TeacherController.create);
routesTeacher.delete('/:id', TeacherController.delete);
routesTeacher.patch('/:id', TeacherController.update);

export default routesTeacher;
