import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import {
    createRecipe,
    getRecipes,
    getRecipeById,
    deleteRecipe,
    editRecipe,
    searchRecipesByIngredients,
    likeRecipe,
    bookmarkRecipe,
} from './recipe.controller';
const recipeRouter = Router();

recipeRouter.get('/', getRecipes);
recipeRouter.get('/search', authMiddleware(), searchRecipesByIngredients);
recipeRouter.get('/:recipeId', getRecipeById);
recipeRouter.post('/create', authMiddleware(), createRecipe);
recipeRouter.put('/:recipeId/edit', authMiddleware(), editRecipe);
recipeRouter.delete('/:recipeId/delete', authMiddleware(), deleteRecipe);
recipeRouter.post('/:recipeId/like', authMiddleware(), likeRecipe);
recipeRouter.post('/:recipeId/bookmark', authMiddleware(), bookmarkRecipe);

export default recipeRouter;
