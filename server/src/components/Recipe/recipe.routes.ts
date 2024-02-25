import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createRecipe, getRecipes, getRecipeById, deleteRecipe, editRecipe } from './recipe.controller';
import { nameValidation } from '../Shared';
const recipeRouter = Router();

recipeRouter.get('/', getRecipes);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.post('/create', authMiddleware(), createRecipe);
recipeRouter.put('/:recipeId/edit', authMiddleware(), editRecipe);
recipeRouter.delete('/:recipeId/delete', authMiddleware(), deleteRecipe);

export default recipeRouter;
