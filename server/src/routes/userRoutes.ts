import { Router } from 'express';
const usersRouter = Router();

usersRouter.get('/');
usersRouter.post('/login');
usersRouter.post('/register');
usersRouter.post('/logout');
usersRouter.patch('/:userId/update');
usersRouter.patch('/:userId/password-reset');
usersRouter.delete('/delete');

module.exports = usersRouter;
