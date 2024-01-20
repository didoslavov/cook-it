import { Router } from 'express';
import { register, login, logout } from './auth.controller';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { getUsers, updateUser } from './user.controller';
const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.post('/logout', authMiddleware(), logout);
usersRouter.patch('/:userId/update', updateUser);

export default usersRouter;
