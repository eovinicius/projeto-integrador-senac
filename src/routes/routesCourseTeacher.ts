import { Router } from 'express';
import { CreateCourseTeacherController } from '../app/controllers/courseTeacher/CreateCourseTeacher';
import { GetByIdCourseTeacherController } from '../app/controllers/courseTeacher/GetTeacher';
import { DeleteCoursoTeacherController } from '../app/controllers/courseTeacher/DeleteCoursoTeacher';


const routesCourseTeacher = Router();

routesCourseTeacher.post('/', CreateCourseTeacherController.handle);
routesCourseTeacher.get('/', GetByIdCourseTeacherController.handle);
routesCourseTeacher.delete('/', DeleteCoursoTeacherController.handle);
export default routesCourseTeacher;
