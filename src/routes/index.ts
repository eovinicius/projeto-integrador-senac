import { Router } from 'express';
import routesCourse from './routesCourse';
import routesTeacher from './routesTeacher';
import routesStudent from './routesStudent';
import routesCourseTeacher from './routesCourseTeacher';
import routesAppointment from './routes-appointment';

const routes = Router();

routes.use('/course', routesCourse);
routes.use('/teacher', routesTeacher);
routes.use('/student', routesStudent);
routes.use('/courseteacher', routesCourseTeacher);
routes.use('/appointment', routesAppointment);
export default routes;
