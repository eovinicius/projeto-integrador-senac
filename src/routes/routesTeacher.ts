import { Router } from 'express';
import { TeacherController } from '../app/controllers/TeacherController';
import { authMiddleware } from '../app/middlewares/authMiddleware';

const routesTeacher = Router();

routesTeacher.get('/', TeacherController.index);
routesTeacher.get('/:id', TeacherController.show);
routesTeacher.post('/', TeacherController.create);
routesTeacher.delete('/:id', authMiddleware, TeacherController.delete);
routesTeacher.patch('/:id', authMiddleware, TeacherController.update);

routesTeacher.post('/login', TeacherController.login);

export default routesTeacher;
