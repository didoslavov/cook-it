import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { Recipe } from '../../../Recipe';
import { Product } from '../../../Product';
import { RecipeProductInterface } from '../../../Shared';

@Table({
    tableName: 'recipe_product',
    modelName: 'RecipeProduct',
})
class RecipeProduct extends Model<RecipeProduct> implements RecipeProductInterface {
    @Column
    @ForeignKey(() => Recipe)
    declare recipeId: string;

    @Column
    @ForeignKey(() => Product)
    declare productId: string;
}

export default RecipeProduct;
