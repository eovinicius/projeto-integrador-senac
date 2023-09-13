import { Router } from 'express';
import routesCourse from './routesCourse';
import routesTeacher from './routesTeacher';
import routesStudent from './routesStudent';
import routesCourseTeacher from './routesCourseTeacher';

const routes = Router();

routes.use('/course', routesCourse);
routes.use('/teacher', routesTeacher);
routes.use('/student', routesStudent);
routes.use('/courseteacher', routesCourseTeacher);
export default routes;
