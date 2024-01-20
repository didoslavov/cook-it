import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { RecipeInterface } from './recipe.interface';
import { findAllRecipes, findRecipeByPk, insertRecipe } from './recipe.service';
import { AppError } from '../Shared';

const createRecipe = expressAsyncHandler(async (req: Request, res: Response) => {
    const recipeData: RecipeInterface = req.body;

    const recipe = await insertRecipe(recipeData);

    if (!recipe) {
        throw new AppError(400, 'Adding recipe failed!');
    }

    res.status(200).json(recipe);
});

const getRecipes = expressAsyncHandler(async (req: Request, res: Response) => {
    const recipes = await findAllRecipes();

    if (!recipes) {
        throw new AppError(400, 'Error getting recipes...');
    }

    if (!recipes.length) {
        throw new AppError(404, 'No recipes found...');
    }

    res.status(200).json(recipes);
});

const getRecipeById = expressAsyncHandler(async (req: Request, res: Response) => {
    const recipeId: string = req.params.recipeId;
    const recipe = await findRecipeByPk(recipeId);

    if (!recipe) {
        throw new AppError(400, 'No such recipe...');
    }

    res.status(200).json(recipe);
});

export { getRecipes, createRecipe, getRecipeById };
