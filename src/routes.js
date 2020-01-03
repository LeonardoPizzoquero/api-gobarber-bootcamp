import { Router } from 'express'; // Rotas do express
import multer from 'multer'; // Biblioteca do multer
import multerConfig from './config/multer'; // Configuração do multer

// Controllers da aplicação
import UserController from './app/controllers/UserController';
import ProviderController from './app/controllers/ProviderController';
import AvailableController from './app/controllers/AvailableController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

// Middleware de autenticação
import authMiddleware from './app/middlewares/auth';
import ScheduleController from './app/controllers/ScheduleController';

// Instância das rotas
const routes = new Router();

// Instância do middleware do multer
const upload = multer(multerConfig);

// Rotas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

// Exportando rotas para o app.js
export default routes;
