import { Model, DataType, BelongsToMany, Column, Table } from 'sequelize-typescript';
import { ProductStorage } from '../../types/productStorage';
import User from './User';
import Recipe from './Recipe';
import List from './List';
import UserProduct from './UserProduct';
import RecipeProduct from './RecipeProduct';
import ListProduct from './ListProduct';

@Table({
    tableName: 'products',
    modelName: 'Product',
})
class Product extends Model implements ProductStorage {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.INTEGER })
    declare quantity: number;

    @BelongsToMany(() => User, () => UserProduct, 'productId', 'userId')
    declare users: User[];

    @BelongsToMany(() => Recipe, () => RecipeProduct, 'productId', 'recipeId')
    declare recipes: Recipe[];

    @BelongsToMany(() => List, () => ListProduct, 'productId', 'listId')
    declare lists: List[];
}

export default Product;
