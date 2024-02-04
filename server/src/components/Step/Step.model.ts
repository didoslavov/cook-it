import { Model, DataType, Column, Table, BelongsToMany } from 'sequelize-typescript';
import { Recipe } from '../Recipe';
import StepRecipe from '../Shared/Relationships/StepRecipe/StepRecipe.model';

@Table({
    tableName: 'steps',
    modelName: 'Step',
    timestamps: false,
})
class Step extends Model {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, allowNull: false })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    declare step: string;

    @BelongsToMany(() => Recipe, () => StepRecipe)
    declare recipes: Recipe[];
}

export default Step;
