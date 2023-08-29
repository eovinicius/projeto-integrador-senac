import { Router } from 'express';
import { GetAllCourseController } from '../app/controllers/Course/GetAllCourseController';
import { GetByIdCourseController } from '../app/controllers/Course/GetByIdCourseController';
import { GetByStatusCourseController } from '../app/controllers/Course/GetByStatusCourseController';
import { CreateCourseController } from '../app/controllers/Course/CreateCourseController';
import { DeleteCourseController } from '../app/controllers/Course/DeleteCourseController';
import { UpdateCourseController } from '../app/controllers/Course/UpdateCourseController';

const routesCourse = Router();

routesCourse.get('/index', GetAllCourseController.handle);
routesCourse.get('/id/:id', GetByIdCourseController.handle);
routesCourse.get('/status', GetByStatusCourseController.handle);
routesCourse.post('/', CreateCourseController.handle);
routesCourse.delete('/:id', DeleteCourseController.handle);
routesCourse.patch('/:id', UpdateCourseController.handle);

export default routesCourse;
