import { Model, DataType, Table, BelongsTo, BelongsToMany, Column } from 'sequelize-typescript';
import { User } from '../User';
import { Ingredient, Product, ProductInterface } from '../Product';
import { ProductRecipe } from '../Shared';
import { RecipeInterface } from './recipe.interface';
import { Step, StepInterface } from '../Step';
import StepRecipe from '../Shared/Relationships/StepRecipe/StepRecipe.model';

@Table({
    tableName: 'recipes',
    modelName: 'Recipe',
    timestamps: false,
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
    declare description: string;

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
    declare ingredients: Ingredient[];

    @BelongsToMany(() => Step, () => StepRecipe)
    declare steps: StepInterface[];
}

export default Recipe;
