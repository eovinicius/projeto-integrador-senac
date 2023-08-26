import { Router } from 'express';
import routesCourse from './routesCourse';
import routesTeacher from './routesTeacher';
import routesStudent from './routesStudent';

const routes = Router();

routes.use('/course', routesCourse);
routes.use('/teacher', routesTeacher);
routes.use('/student', routesStudent);

export default routes;
