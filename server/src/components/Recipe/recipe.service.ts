import Recipe from './Recipe.model';
import { RecipeInterface } from './recipe.interface';

export const findAllRecipes = async (): Promise<RecipeInterface[]> => {
    const recipes = await Recipe.findAll();
    return recipes.map((p): RecipeInterface => p.toJSON());
};

export const insertRecipe = async (recipe: RecipeInterface): Promise<RecipeInterface> => {
    const createdRecipe = await Recipe.create(recipe);
    return createdRecipe.toJSON();
};

export const findRecipeByPk = async (recipeId: string): Promise<RecipeInterface | undefined> => {
    const recipe = await Recipe.findByPk(recipeId);
    return recipe?.toJSON();
};
