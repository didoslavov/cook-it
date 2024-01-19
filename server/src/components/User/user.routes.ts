import { Router } from 'express';
import { register } from './user.controller';
const usersRouter = Router();

usersRouter.get('/');
usersRouter.post('/login');
usersRouter.post('/register', register);
usersRouter.post('/logout');
usersRouter.patch('/:userId/update');
usersRouter.patch('/:userId/password-reset');
usersRouter.delete('/delete');

export default usersRouter;
