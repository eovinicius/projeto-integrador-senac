import { Router } from 'express';
import { CreateCourseTeacher } from '../app/controllers/courseTeacher/CreateCourseTeacher';
import { GetByIdCourseTeacher } from '../app/controllers/courseTeacher/GetByIdTeacher';
import { DeleteCoursoTeacher } from '../app/controllers/courseTeacher/DeleteCoursoTeacher';

const routesCourseTeacher = Router();

routesCourseTeacher.post('/', CreateCourseTeacher.handle);
routesCourseTeacher.get('/', GetByIdCourseTeacher.handle);
routesCourseTeacher.delete('/', DeleteCoursoTeacher.handle);
export default routesCourseTeacher;
