import { Router } from 'express';
import { register, login, logout } from './auth.controller';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { getUsers, updateUser } from './user.controller';
import { loginValidation, registerValidation } from './user.validation';
import { getUserRecipes } from '../Recipe/recipe.controller';
const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/login', loginValidation, login);
usersRouter.post('/register', registerValidation, register);
usersRouter.post('/logout', authMiddleware(), logout);
usersRouter.patch('/:userId/update', updateUser);
usersRouter.get('/recipes', authMiddleware(), getUserRecipes);

export default usersRouter;
