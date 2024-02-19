import { Ingredient } from '../../../Product';
import ProductRecipe from './ProductRecipe.model';

export const createProductRecipe = async (recipeId: string, ingredients: Ingredient[]) => {
    await ProductRecipe.bulkCreate(
        ingredients.map((i) => ({
            recipeId,
            productId: i.id,
            quantity: i.quantity,
            quantity_unit: i.unit,
        }))
    );
};
