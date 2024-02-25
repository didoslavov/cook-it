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
        // Check if the ingredient already exists in the database
        const existingProduct = await Product.findByPk(ingredientId);

        if (existingProduct) {
            // Check if the name has changed
            if (existingProduct.name !== name) {
                // Find or create the ingredient with the new name
                const [newProduct] = await Product.findOrCreate({ where: { name } });

                // Remove the association between the old ingredient and the recipe
                await ProductRecipe.destroy({ where: { recipeId, productId: existingProduct.id } });

                // If quantity and unit are provided, update them for the new ingredient
                if (quantity !== undefined && unit !== undefined) {
                    await ProductRecipe.create({
                        recipeId,
                        productId: newProduct.id,
                        quantity,
                        unit,
                    });
                }
            } else {
                // Update the existing ingredient
                const updateData: any = { name };
                if (quantity !== undefined && unit !== undefined) {
                    updateData.ProductRecipe = { quantity, unit };
                }
                await existingProduct.update(updateData);

                // Update the quantity and unit in the ProductRecipe junction table
                if (quantity !== undefined && unit !== undefined) {
                    await ProductRecipe.update({ quantity, unit }, { where: { recipeId, productId: existingProduct.id } });
                }
            }
        } else {
            // Create a new ingredient if it doesn't exist
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
