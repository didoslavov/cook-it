import { Op } from 'sequelize';
import { Ingredient, Product } from '../Product';
import { insertIngredients } from '../Product/product.service';
import { AppError, ProductRecipe } from '../Shared';
import {
    createProductRecipe,
    removeIngredientFromRecipe,
    updateIngredientRecipe,
} from '../Shared/Relationships/ProductRecipe/productRecipe.service';
import StepRecipe from '../Shared/Relationships/StepRecipe/StepRecipe.model';
import { createStepRecipe, updateStepRecipe } from '../Shared/Relationships/StepRecipe/stepRecipe.service';
import { Step } from '../Step';
import { createSteps } from '../Step/step.service';
import Recipe from './Recipe.model';
import { Bookmark, Like, RecipeData, RecipeInterface } from './recipe.interface';
import LikeRecipe from '../Shared/Relationships/Like/LikeRecipe.model';
import BookmarkRecipe from '../Shared/Relationships/BookmarkRecipe/BookmarkRecipe.model';

export const searchRecipe = async (
    ingredients: string[],
    offset: number,
    limit: number
): Promise<{ recipes: RecipeInterface[]; count: number }> => {
    const { count, rows } = await Recipe.findAndCountAll({
        distinct: true,
        include: [
            {
                model: Product,
                attributes: ['name'],
                through: { attributes: [] },
                where: {
                    [Op.or]: ingredients.map((ingredient) => ({
                        name: {
                            [Op.like]: `%${ingredient}%`,
                        },
                    })),
                },
            },
        ],
        limit,
        offset,
    });

    return {
        recipes: rows.map((r): RecipeInterface => r.toJSON()),
        count,
    };
};

export const findRecipes = async (limit: number, offset: number): Promise<{ recipes: RecipeInterface[]; count: number }> => {
    const { count, rows } = await Recipe.findAndCountAll({
        limit,
        offset,
    });

    return {
        recipes: rows.map((r): RecipeInterface => r.toJSON()),
        count: count,
    };
};

export const findUserRecipes = async (
    limit: number,
    offset: number,
    userId: string | undefined
): Promise<{ recipes: RecipeInterface[]; count: number }> => {
    const { count, rows } = await Recipe.findAndCountAll({
        limit,
        offset,
        where: { userId },
    });

    return {
        recipes: rows.map((r): RecipeInterface => r.toJSON()),
        count: count,
    };
};

export const findLikedRecipes = async (
    limit: number,
    offset: number,
    userId: string | undefined
): Promise<{ recipes: RecipeInterface[]; count: number }> => {
    const likedRecipeIds = await LikeRecipe.findAll({
        where: { userId },
        attributes: ['recipeId'],
        limit,
        offset,
    });

    const likedRecipeIdsArray = likedRecipeIds.map((like) => like.recipeId);

    const { count, rows } = await Recipe.findAndCountAll({
        where: { id: likedRecipeIdsArray },
        limit,
        offset,
    });

    return {
        recipes: rows.map((r): RecipeInterface => r.toJSON()),
        count: count,
    };
};

export const findBookmarkedRecipes = async (
    limit: number,
    offset: number,
    userId: string | undefined
): Promise<{ recipes: RecipeInterface[]; count: number }> => {
    const bookmarkedRecipeIds = await BookmarkRecipe.findAll({
        where: { userId },
        attributes: ['recipeId'],
        limit,
        offset,
    });

    const bookmarkedRecipeIdsArray = bookmarkedRecipeIds.map((bookmark) => bookmark.recipeId);

    const { count, rows } = await Recipe.findAndCountAll({
        where: { id: bookmarkedRecipeIdsArray },
        limit,
        offset,
    });

    return {
        recipes: rows.map((r): RecipeInterface => r.toJSON()),
        count: count,
    };
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
        const correspondingIngredient = ingredients.find((ingredient) => ingredient?.name === createdIngredient.name);

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

export const updateRecipe = async (recipeId: string, recipeData: RecipeData): Promise<RecipeInterface> => {
    const existingRecipe = await Recipe.findByPk(recipeId, {
        include: [
            { model: Product, attributes: ['id', 'name'], through: { attributes: ['quantity', 'unit'] } },
            { model: Step, attributes: ['id', 'step'], through: { attributes: [] } },
        ],
    });

    if (!existingRecipe) {
        throw new AppError(404, 'Recipe not found!');
    }

    existingRecipe.name = recipeData.name;
    existingRecipe.prepTime = Number(recipeData.prepTime);
    existingRecipe.cookTime = Number(recipeData.cookTime);
    existingRecipe.img = recipeData.img;
    existingRecipe.userId = recipeData.userId;
    existingRecipe.description = recipeData.description;

    await existingRecipe.save();

    for (const ingredient of recipeData.ingredients) {
        if (ingredient.id) {
            await updateIngredientRecipe(
                existingRecipe.id,
                ingredient.id,
                ingredient.name,
                ingredient.ProductRecipe.quantity,
                ingredient.ProductRecipe.unit
            );
        } else {
            const existingIngredient = await Product.findOne({ where: { name: ingredient.name } });

            if (existingIngredient) {
                await updateIngredientRecipe(
                    existingRecipe.id,
                    existingIngredient.id,
                    ingredient.name,
                    ingredient.ProductRecipe.quantity,
                    ingredient.ProductRecipe.unit
                );
            } else {
                const createdIngredient = await insertIngredients([ingredient]);

                await createProductRecipe(existingRecipe.id, [
                    {
                        id: createdIngredient[0].id,
                        name: ingredient.name,
                        ProductRecipe: {
                            quantity: ingredient.ProductRecipe.quantity,
                            unit: ingredient.ProductRecipe.unit,
                        },
                    },
                ]);
            }
        }
    }

    const ingredientIdsInRecipe = recipeData.ingredients.map((ingredient) => ingredient.id);
    const allIngredientIdsInRecipe = existingRecipe.ingredients.map((ingredient) => ingredient.id);

    const ingredientsToRemove = allIngredientIdsInRecipe.filter((id) => !ingredientIdsInRecipe.includes(id));
    for (const ingredientId of ingredientsToRemove) {
        await removeIngredientFromRecipe(existingRecipe.id, ingredientId);
    }

    const newSteps = recipeData.steps;

    const existingStepNames = existingRecipe.steps.map((step) => step.step);

    const stepsToRemove = existingStepNames.filter((step) => !newSteps.includes(step));
    for (const step of stepsToRemove) {
        await updateStepRecipe(step, '', recipeId);
    }

    const stepsToAdd = newSteps.filter((step) => !existingStepNames.includes(step));
    for (const step of stepsToAdd) {
        await updateStepRecipe('', step, recipeId);
    }

    return existingRecipe.toJSON();
};

export const findRecipeByPk = async (recipeId: string): Promise<RecipeData | undefined> => {
    const recipe = await Recipe.findByPk(recipeId, {
        include: [
            {
                model: Product,
                attributes: ['id', 'name'],
                through: { attributes: ['quantity', 'unit'] },
            },
            {
                model: Step,
                attributes: ['step'],
                through: { attributes: [] },
            },
            {
                model: LikeRecipe,
                attributes: ['userId'],
                where: { recipeId },
                required: false,
            },
            {
                model: BookmarkRecipe,
                attributes: ['userId'],
                where: { recipeId },
                required: false,
            },
        ],
    });

    if (recipe) {
        const steps = recipe.steps.map((s) => s.step);
        const likesCount = await LikeRecipe.count({ where: { recipeId } });
        const liked = !!recipe.userId && recipe.likes.some((like) => like.userId === recipe.userId);
        const bookmarksCount = await BookmarkRecipe.count({ where: { recipeId } });
        const bookmarked = !!recipe.userId && recipe.bookmarks.some((bookmark) => bookmark.userId === recipe.userId);

        return {
            ...recipe.toJSON(),
            steps,
            ingredients: recipe.ingredients,
            like: { liked, likesCount },
            bookmark: { bookmarked, bookmarksCount },
        };
    }
};

export const destroyRecipe = async (recipeId: string): Promise<number> => {
    await ProductRecipe.destroy({ where: { recipeId } });
    await StepRecipe.destroy({ where: { recipeId } });

    return await Recipe.destroy({ where: { id: recipeId } });
};

export const like = async (recipeId: string, userId: string): Promise<Like> => {
    const like = await LikeRecipe.create({ recipeId, userId });
    const likesCount = await LikeRecipe.count({ where: { recipeId } });

    if (like) {
        return { liked: true, likesCount };
    }

    return { liked: false, likesCount };
};

export const deleteLike = async (recipeId: string, userId: string): Promise<Like> => {
    await LikeRecipe.destroy({ where: { recipeId, userId } });

    const likesCount = await LikeRecipe.count({ where: { recipeId } });

    return { liked: false, likesCount };
};

export const bookmark = async (recipeId: string, userId: string): Promise<Bookmark> => {
    const bookmark = await BookmarkRecipe.create({ recipeId, userId });
    const bookmarksCount = await BookmarkRecipe.count({ where: { recipeId } });

    if (bookmark) {
        return { bookmarked: true, bookmarksCount };
    }

    return { bookmarked: false, bookmarksCount };
};

export const deleteBookmark = async (recipeId: string, userId: string): Promise<Bookmark> => {
    await BookmarkRecipe.destroy({ where: { recipeId, userId } });

    const bookmarksCount = await BookmarkRecipe.count({ where: { recipeId } });

    return { bookmarked: false, bookmarksCount };
};
