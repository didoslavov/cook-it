import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createRecipe, getRecipes, getRecipeById } from './recipe.controller';
const recipeRouter = Router();

recipeRouter.get('/', getRecipes);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.post('/:recipeId/create', createRecipe);

export default recipeRouter;
