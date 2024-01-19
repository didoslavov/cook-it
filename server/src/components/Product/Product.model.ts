import { Model, DataType, Column, Table, BelongsToMany } from 'sequelize-typescript';
import { Recipe } from '../Recipe';
import { ProductInventory, ProductList, RecipeProduct } from '../Shared';
import { List } from '../List';
import { Inventory } from '../Inventory';
import { ProductInterface } from './product.interface';

@Table({
    tableName: 'products',
    modelName: 'Product',
})
class Product extends Model<Product> implements ProductInterface {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    declare quantity: number;

    @BelongsToMany(() => Recipe, () => RecipeProduct)
    declare recipes: Recipe[];

    @BelongsToMany(() => List, () => ProductList)
    declare lists: List[];

    @BelongsToMany(() => Inventory, () => ProductInventory)
    declare inventories: Inventory[];
}

export default Product;
