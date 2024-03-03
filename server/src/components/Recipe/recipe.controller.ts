import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { RecipeData } from './recipe.interface';
import {
    destroyRecipe,
    findRecipes,
    findRecipeByPk,
    insertRecipe,
    updateRecipe,
    findUserRecipes,
    searchRecipe,
} from './recipe.service';
import { AppError, mapValidationError } from '../Shared';
import { validationResult } from 'express-validator';
import { UserRequest } from '../User';

const createRecipe = expressAsyncHandler(async (req: Request, res: Response) => {
    const validations = validationResult(req);
    const errors = validations.array();

    if (errors.length) {
        throw new AppError(400, errors.map(mapValidationError).join('; '));
    }

    const recipeData: RecipeData = req.body;

    const recipe = await insertRecipe(recipeData);

    if (!recipe) {
        throw new AppError(400, 'Adding recipe failed!');
    }

    res.status(200).json(recipe);
});

const editRecipe = expressAsyncHandler(async (req: Request, res: Response) => {
    const recipeId: string = req.params.recipeId;
    const validations = validationResult(req);
    const errors = validations.array();

    if (errors.length) {
        throw new AppError(400, errors.map(mapValidationError).join('; '));
    }

    const recipeData: RecipeData = req.body;

    const recipe = await updateRecipe(recipeId, recipeData);

    if (!recipe) {
        throw new AppError(400, 'Editing recipe failed!');
    }

    res.status(200).json(recipe);
});

const getRecipes = expressAsyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? Number(req.query.limit) : 4;
    const offset = req.query.offset ? Number(req.query.offset) : 1;
    const recipes = await findRecipes(limit, offset);

    if (!recipes) {
        throw new AppError(400, 'Error getting recipes...');
    }

    if (!recipes.length) {
        throw new AppError(404, 'No recipes found...');
    }

    res.status(200).json(recipes);
});

const searchRecipesByIngredients = expressAsyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit ? Number(req.query.limit) : 4;
    const offset = req.query.offset ? Number(req.query.offset) : 1;
    const ingredients: string[] = (req.query.ingredients as string).split(' ');

    const recipes = await searchRecipe(ingredients, offset, limit);

    if (!recipes) {
        throw new AppError(400, 'Error getting recipes...');
    }

    if (!recipes.length) {
        throw new AppError(404, 'No recipes found...');
    }

    res.status(200).json(recipes);
});

const getUserRecipes = expressAsyncHandler(async (req: UserRequest, res: Response) => {
    const userId = req.user?.id;
    const limit = req.query.limit ? Number(req.query.limit) : 4;
    const offset = req.query.offset ? Number(req.query.offset) : 1;
    const recipes = await findUserRecipes(limit, offset, userId);

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

const deleteRecipe = expressAsyncHandler(async (req: Request, res: Response) => {
    const { recipeId } = req.params;

    const deletedRecipe = await destroyRecipe(recipeId);

    if (!deletedRecipe) {
        throw new AppError(204, 'No recipe deleted!');
    }

    res.status(200).json('Recipe deleted');
});

export { getRecipes, getUserRecipes, createRecipe, getRecipeById, editRecipe, deleteRecipe, searchRecipesByIngredients };
