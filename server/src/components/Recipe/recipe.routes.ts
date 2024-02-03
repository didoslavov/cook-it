import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createRecipe, getRecipes, getRecipeById } from './recipe.controller';
import { nameValidation } from '../Shared';
const recipeRouter = Router();

recipeRouter.get('/', getRecipes);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.post('/create', authMiddleware(), nameValidation, createRecipe);

export default recipeRouter;
