import { Router } from 'express';
import { CourseController } from '../app/controllers/CourseController';

const routesCourse = Router();
routesCourse.get('/', CourseController.index);
routesCourse.get('/:id', CourseController.show);
routesCourse.post('/', CourseController.create);
routesCourse.delete('/:id', CourseController.delete);
routesCourse.patch('/:id', CourseController.update);

export default routesCourse;
