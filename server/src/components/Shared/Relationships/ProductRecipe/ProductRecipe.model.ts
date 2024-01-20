import { Model, Column, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { Recipe } from '../../../Recipe';
import { Product } from '../../../Product';
import { ProductRecipeInterface } from '../..';

@Table({
    tableName: 'product_recipe',
    modelName: 'ProductRecipe',
})
class ProductRecipe extends Model<ProductRecipe> implements ProductRecipeInterface {
    @Column
    @ForeignKey(() => Recipe)
    declare recipeId: string;

    @Column
    @ForeignKey(() => Product)
    declare productId: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    declare quantity: number;
}

export default ProductRecipe;
