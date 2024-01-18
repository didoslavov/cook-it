import { Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from '../../Product';
import { Recipe } from '../../Recipe';

@Table({
    tableName: 'recipe_product',
    modelName: 'RecipeProduct',
})
class RecipeProduct extends Model {
    @ForeignKey(() => Recipe)
    declare recipeId: string;

    @ForeignKey(() => Product)
    declare productId: string;

    @BelongsTo(() => Recipe)
    declare recipe: Recipe;

    @BelongsTo(() => Product)
    declare product: Product;
}

export default RecipeProduct;
