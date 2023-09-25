import { Router } from 'express';
import { GetAppointmentController } from '../app/controllers/Appointment/GetAppointmentController';
import { CreateAppointmentController } from '../app/controllers/Appointment/CreateAppointmentController';
import { DeleteAppointmentController } from '../app/controllers/Appointment/DeleteAppointmentController';
import { UpdateAppointmentController } from '../app/controllers/Appointment/UpdateAppointmentController';

const routesAppointment = Router();

routesAppointment.get('/index', GetAppointmentController.handle);
routesAppointment.post('/', CreateAppointmentController.handle);
routesAppointment.delete('/:cod_appointment', DeleteAppointmentController.handle);
routesAppointment.patch('/:cod_appointment', UpdateAppointmentController.handle);

export default routesAppointment;
