import { Router } from 'express';
import { register } from './auth.controller';
import authMiddleware from '../Shared/middlewares/authMiddleware';
const usersRouter = Router();

usersRouter.get('/');
usersRouter.post('/login');
usersRouter.post('/register', register);
usersRouter.post('/logout', authMiddleware);
usersRouter.patch('/:userId/update');
usersRouter.patch('/:userId/password-reset');
usersRouter.delete('/delete');

export default usersRouter;
