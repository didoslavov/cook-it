import { Router } from 'express';
import { register, login, logout } from './auth.controller';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { getUsers, updateUser } from './user.controller';
import { loginValidation, registerValidation } from './user.validation';
import { getBookmarkedRecipes, getLikedRecipes, getUserRecipes } from '../Recipe/recipe.controller';
const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/login', loginValidation, login);
usersRouter.post('/register', registerValidation, register);
usersRouter.post('/logout', logout);
usersRouter.patch('/:userId/update', updateUser);
usersRouter.get('/recipes', authMiddleware(), getUserRecipes);
usersRouter.get('/recipes/liked', authMiddleware(), getLikedRecipes);
usersRouter.get('/recipes/bookmarked', authMiddleware(), getBookmarkedRecipes);

export default usersRouter;
