import { Router } from 'express';
import { CreateCourseTeacher } from '../app/controllers/courseTeacher/CreateCourseTeacher';

const routesCourseTeacher = Router();

routesCourseTeacher.post('/', CreateCourseTeacher.handle);

export default routesCourseTeacher;
