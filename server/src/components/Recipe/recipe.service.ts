import { Ingredient } from '../Product';
import { insertIngredients } from '../Product/product.service';
import { AppError } from '../Shared';
import { createProductRecipe } from '../Shared/Relationships/ProductRecipe/productRecipe.service';
import { createStepRecipe } from '../Shared/Relationships/StepRecipe/stepRecipe.service';
import { StepInterface } from '../Step';
import { createSteps } from '../Step/step.service';
import Recipe from './Recipe.model';
import { RecipeData, RecipeInterface } from './recipe.interface';

export const findAllRecipes = async (): Promise<RecipeInterface[]> => {
    const recipes = await Recipe.findAll();
    return recipes.map((p): RecipeInterface => p.toJSON());
};

export const insertRecipe = async (recipeData: RecipeData): Promise<RecipeInterface> => {
    const ingredients: Ingredient[] = recipeData.ingredients;
    const steps: StepInterface[] = recipeData.steps;
    const recipe: RecipeInterface = {
        name: recipeData.name,
        prepTime: Number(recipeData.prepTime),
        cookTime: Number(recipeData.cookTime),
        img: recipeData.img,
        userId: recipeData.userId,
        description: recipeData.description,
    };

    const createdRecipe = await Recipe.create(recipe);

    if (!createdRecipe) {
        throw new AppError(400, 'Recipe not created!');
    }

    const createdIngredients = await insertIngredients(ingredients);
    const createdSteps = await createSteps(createdRecipe.id, steps);

    const mappedIngredients = createdIngredients.map((createdIngredient): Ingredient => {
        const correspondingIngredient = ingredients.find((ingredient) => ingredient.name === createdIngredient.name);

        return {
            id: createdIngredient.id,
            name: correspondingIngredient!.name,
            quantity: correspondingIngredient!.quantity,
            unit: correspondingIngredient!.unit,
        };
    });

    await createProductRecipe(createdRecipe.id, mappedIngredients);
    await createStepRecipe(createdRecipe.id, createdSteps);

    return createdRecipe.toJSON();
};

export const findRecipeByPk = async (recipeId: string): Promise<RecipeInterface | undefined> => {
    const recipe = await Recipe.findByPk(recipeId);
    return recipe?.toJSON();
};
