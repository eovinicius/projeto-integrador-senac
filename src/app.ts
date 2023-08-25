import 'express-async-errors';
import express from 'express';
import routes from './routes';
import { errorMiddleware } from './app/middlewares/errorMiddleware';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

export default app;
