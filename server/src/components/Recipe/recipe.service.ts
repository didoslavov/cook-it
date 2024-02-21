import { Ingredient, Product, ProductInterface } from '../Product';
import { insertIngredients } from '../Product/product.service';
import { AppError, ProductRecipe } from '../Shared';
import { createProductRecipe } from '../Shared/Relationships/ProductRecipe/productRecipe.service';
import { createStepRecipe } from '../Shared/Relationships/StepRecipe/stepRecipe.service';
import { Step, StepInterface } from '../Step';
import { createSteps } from '../Step/step.service';
import Recipe from './Recipe.model';
import { RecipeData, RecipeInterface } from './recipe.interface';

export const findRecipes = async (limit: number, offset: number): Promise<RecipeInterface[]> => {
    const recipes = await Recipe.findAll({
        limit,
        offset,
    });

    return recipes.map((p): RecipeInterface => p.toJSON());
};

export const insertRecipe = async (recipeData: RecipeData): Promise<RecipeInterface> => {
    const ingredients: Ingredient[] = recipeData.ingredients;
    const steps: string[] = recipeData.steps;
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

        console.log(correspondingIngredient);
        return {
            id: createdIngredient.id,
            name: correspondingIngredient!.name,
            ProductRecipe: {
                quantity: correspondingIngredient!.ProductRecipe.quantity,
                unit: correspondingIngredient!.ProductRecipe.unit,
            },
        };
    });

    await createProductRecipe(createdRecipe.id, mappedIngredients);
    await createStepRecipe(createdRecipe.id, createdSteps);

    return createdRecipe.toJSON();
};

export const findRecipeByPk = async (recipeId: string): Promise<RecipeData | undefined> => {
    const recipe = await Recipe.findByPk(recipeId, {
        include: [
            {
                model: Product,
                attributes: ['name'],
                through: { attributes: ['quantity', 'unit'] },
            },
            {
                model: Step,
                attributes: ['step'],
                through: { attributes: [] },
            },
        ],
    });

    if (recipe) {
        const steps = recipe.steps.map((s) => s.step);

        return { ...recipe.toJSON(), steps, ingredients: recipe.ingredients };
    }
};

export const destroyRecipe = async (recipeId: string): Promise<number> => {
    return await Recipe.destroy({ where: { id: recipeId } });
};
