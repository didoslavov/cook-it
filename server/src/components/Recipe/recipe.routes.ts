import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createRecipe, getRecipes, getRecipeById, deleteRecipe } from './recipe.controller';
import { nameValidation } from '../Shared';
const recipeRouter = Router();

recipeRouter.get('/', getRecipes);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.post('/create', authMiddleware(), createRecipe);
recipeRouter.delete('/:recipeId/delete', authMiddleware(), deleteRecipe);

export default recipeRouter;
