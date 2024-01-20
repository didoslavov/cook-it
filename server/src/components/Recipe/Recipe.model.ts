import { Model, DataType, Table, BelongsTo, BelongsToMany, Column } from 'sequelize-typescript';
import { User } from '../User';
import { Product } from '../Product';
import { ProductRecipe } from '../Shared';
import { RecipeInterface } from './recipe.interface';

@Table({
    tableName: 'recipes',
    modelName: 'Recipe',
})
class Recipe extends Model<RecipeInterface> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
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

    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string;

    @BelongsTo(() => User, 'userId')
    declare user: User;

    @BelongsToMany(() => Product, () => ProductRecipe)
    declare products: Product[];
}

export default Recipe;
