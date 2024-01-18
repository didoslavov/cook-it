import { Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from '../../Product';
import { Recipe } from '../../Recipe';

@Table({
    tableName: 'recipeproduct',
    modelName: 'RecipeProduct',
})
class RecipeProduct extends Model {
    @ForeignKey(() => Recipe)
    declare recipeId: number;

    @ForeignKey(() => Product)
    declare productId: number;

    @BelongsTo(() => Recipe)
    declare recipe: Recipe;

    @BelongsTo(() => Product)
    declare product: Product;
}

export default RecipeProduct;
