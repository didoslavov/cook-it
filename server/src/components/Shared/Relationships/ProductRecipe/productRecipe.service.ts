import { Ingredient, Product, ProductInterface } from '../../../Product';
import ProductRecipe from './ProductRecipe.model';

export const createProductRecipe = async (recipeId: string, ingredients: Ingredient[]) => {
    await ProductRecipe.bulkCreate(
        ingredients.map((i) => ({
            recipeId,
            productId: i.id,
            quantity: i.ProductRecipe.quantity,
            unit: i.ProductRecipe.unit,
        }))
    );
};

export const updateIngredientRecipe = async (
    recipeId: string,
    oldIngredientId: string,
    newIngredientName: string,
    quantity: string | undefined,
    unit: string | undefined
): Promise<void> => {
    try {
        let existingProduct = await Product.findOne({ where: { name: newIngredientName } });

        if (!existingProduct) {
            existingProduct = await Product.create({ name: newIngredientName, ProductRecipe: { quantity, unit } });
        }

        const existingProductRecipe = await ProductRecipe.findOne({
            where: { recipeId, productId: oldIngredientId },
        });

        const [productRecipe, created] = await ProductRecipe.findOrCreate({
            where: { recipeId, productId: existingProduct.id },
            defaults: { recipeId, productId: existingProduct.id },
        });

        if (!created && existingProductRecipe) {
            productRecipe.quantity = quantity !== undefined ? quantity : existingProductRecipe.quantity;
            productRecipe.unit = unit !== undefined ? unit : existingProductRecipe.unit;

            await productRecipe.save();
        } else {
            productRecipe.quantity = quantity;
            productRecipe.unit = unit;

            await productRecipe.save();
        }

        if (oldIngredientId !== existingProduct.id) {
            await ProductRecipe.destroy({ where: { recipeId, productId: oldIngredientId } });
        }
    } catch (error) {
        console.error('Error updating ingredient:', error);
        throw error;
    }
};

export const removeIngredientFromRecipe = async (recipeId: string, ingredientId: string | undefined): Promise<void> => {
    try {
        await ProductRecipe.destroy({ where: { recipeId, productId: ingredientId } });
    } catch (error) {
        console.error('Error removing ingredient from recipe:', error);
        throw error;
    }
};
