import { Ingredient, Product } from '../../../Product';
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
    ingredientId: string,
    name: string,
    quantity: string | undefined,
    unit: string | undefined
): Promise<void> => {
    try {
        const existingProduct = await Product.findByPk(ingredientId);

        if (existingProduct) {
            if (existingProduct.name !== name) {
                const [newProduct] = await Product.findOrCreate({ where: { name } });

                await ProductRecipe.destroy({ where: { recipeId, productId: existingProduct.id } });

                if (quantity !== undefined && unit !== undefined) {
                    await ProductRecipe.create({
                        recipeId,
                        productId: newProduct.id,
                        quantity,
                        unit,
                    });
                }
            } else {
                const updateData: any = { name };
                if (quantity !== undefined && unit !== undefined) {
                    updateData.ProductRecipe = { quantity, unit };
                }
                await existingProduct.update(updateData);

                if (quantity !== undefined && unit !== undefined) {
                    await ProductRecipe.update({ quantity, unit }, { where: { recipeId, productId: existingProduct.id } });
                }
            }
        } else {
            const newProduct = await Product.create({ name, ProductRecipe: { quantity, unit } });
            if (quantity !== undefined && unit !== undefined) {
                await ProductRecipe.create({
                    recipeId,
                    productId: newProduct.id,
                    quantity,
                    unit,
                });
            }
        }
    } catch (error) {
        console.error('Error updating ingredient:', error);
        throw error;
    }
};
