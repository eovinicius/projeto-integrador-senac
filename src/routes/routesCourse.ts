import { Router } from 'express';
import { CourseController } from '../app/controllers/CourseController';

const routesCourse = Router();
routesCourse.get('/index', CourseController.index);
routesCourse.get('/id/:id', CourseController.show);
routesCourse.get('/status', CourseController.getByStatus);
routesCourse.post('/', CourseController.create);
routesCourse.delete('/:id', CourseController.delete);
routesCourse.patch('/:id', CourseController.update);

export default routesCourse;
