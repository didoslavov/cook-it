import { Model, DataType, BelongsToMany, Column, Table } from 'sequelize-typescript';
import { ProductStorage } from './';
import { User } from '../User';
import { Recipe } from '../Recipe';
import { List } from '../List';

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

    @BelongsToMany(() => User, { through: { model: 'UserProduct' }, foreignKey: 'productId', otherKey: 'userId' })
    declare users: User[];

    @BelongsToMany(() => Recipe, { through: { model: 'RecipeProduct' }, foreignKey: 'productId', otherKey: 'recipeId' })
    declare recipes: Recipe[];

    @BelongsToMany(() => List, { through: { model: 'ListProduct' }, foreignKey: 'productId', otherKey: 'listId' })
    declare lists: List[];
}

export default Product;
