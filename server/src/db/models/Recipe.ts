import { Model, DataType, Table, BelongsTo, BelongsToMany, Column } from 'sequelize-typescript';
import Product from './Product';
import User from './User';
import RecipeProduct from './RecipeProduct';

@Table({
    tableName: 'recipes',
    modelName: 'Recipe',
})
class Recipe extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare steps: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    declare prepTime: number;
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    declare cookTime: number;
    @Column({
        type: DataType.STRING,
    })
    declare img: string;
    @BelongsTo(() => User, 'userId')
    user: User | undefined;

    @BelongsToMany(() => Product, () => RecipeProduct)
    products: Product[] = [];
}

export default Recipe;
