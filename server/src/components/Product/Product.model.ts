import { Model, DataType, Column, Table, BelongsToMany } from 'sequelize-typescript';
import { Recipe } from '../Recipe';
import { ProductInventory, ProductList, ProductRecipe } from '../Shared';
import { List } from '../List';
import { Inventory } from '../Inventory';
import { ProductInterface } from './product.interface';

@Table({
    tableName: 'products',
    modelName: 'Product',
})
class Product extends Model<ProductInterface> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    declare name: string;

    @BelongsToMany(() => Recipe, () => ProductRecipe)
    declare recipes: Recipe[];

    @BelongsToMany(() => List, () => ProductList)
    declare lists: List[];

    @BelongsToMany(() => Inventory, () => ProductInventory)
    declare inventories: Inventory[];
}

export default Product;
