import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import {
    createRecipe,
    getRecipes,
    getRecipeById,
    deleteRecipe,
    editRecipe,
    searchRecipesByIngredients,
} from './recipe.controller';
const recipeRouter = Router();

recipeRouter.get('/', getRecipes);
recipeRouter.get('/search', authMiddleware(), searchRecipesByIngredients);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.post('/create', authMiddleware(), createRecipe);
recipeRouter.put('/:recipeId/edit', authMiddleware(), editRecipe);
recipeRouter.delete('/:recipeId/delete', authMiddleware(), deleteRecipe);

export default recipeRouter;
