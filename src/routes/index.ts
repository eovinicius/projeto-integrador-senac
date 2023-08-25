import { Router } from 'express';
import routesCourse from './routesCourse';
import routesTeacher from './routesTeacher';

const routes = Router();

routes.use('/course', routesCourse);
routes.use('/teacher', routesTeacher);

export default routes;
