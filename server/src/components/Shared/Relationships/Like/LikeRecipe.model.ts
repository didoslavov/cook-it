import { Model, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from '../../../User';
import { Recipe } from '../../../Recipe';
import { LikeInterface } from './likeRecipe.interface';

@Table({
    tableName: 'likes',
    modelName: 'LikeRecipe',
})
class LikeRecipe extends Model<LikeInterface> {
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string;

    @ForeignKey(() => Recipe)
    @Column({ type: DataType.UUID, allowNull: false })
    declare recipeId: string;
}

export default LikeRecipe;
