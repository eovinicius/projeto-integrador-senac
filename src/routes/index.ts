import { Router } from 'express';
import routesCourse from './routesCourse';
import routesTeacher from './routesTeacher';
import routesStudent from './routesStudent';
import routesCourseTeacher from './routesCourseTeacher';
import routesAppointment from './routes-appointment';
import routesDocumentation from './routes-documentation';

const routes = Router();

routes.use('/course', routesCourse);
routes.use('/teacher', routesTeacher);
routes.use('/student', routesStudent);
routes.use('/courseteacher', routesCourseTeacher);
routes.use('/appointment', routesAppointment);
routes.use('/documentation', routesDocumentation);

export default routes;
