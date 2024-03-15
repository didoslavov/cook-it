import { Model, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { SaveInterface } from './save.interface';
import { User } from '../../../User';
import { Recipe } from '../../../Recipe';

@Table({
    tableName: 'saves',
    modelName: 'Save',
})
class Save extends Model<SaveInterface> {
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string;

    @ForeignKey(() => Recipe)
    @Column({ type: DataType.UUID, allowNull: false })
    declare recipeId: string;
}

export default Save;
