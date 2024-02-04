import { Model, Column, Table, ForeignKey } from 'sequelize-typescript';
import { Recipe } from '../../../Recipe';
import { Step } from '../../../Step';

@Table({
    tableName: 'step_recipe',
    modelName: 'StepRecipe',
})
class StepRecipe extends Model {
    @Column
    @ForeignKey(() => Recipe)
    declare recipeId: string;

    @Column
    @ForeignKey(() => Step)
    declare stepId: string;
}

export default StepRecipe;
