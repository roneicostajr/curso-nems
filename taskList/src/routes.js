import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import TasksController from './app/controllers/TasksController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/tasks', TasksController.index);
routes.post('/tasks', TasksController.store);
routes.put('/tasks/:id', TasksController.update);
routes.delete('/tasks/:id', TasksController.delete);

export default routes;
