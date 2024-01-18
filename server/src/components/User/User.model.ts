import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { UserStorage } from './';
import { Inventory } from '../Inventory';
import { Recipe } from '../Recipe';
import { List } from '../List';

@Table({
    tableName: 'user',
    modelName: 'User',
})
class User extends Model implements UserStorage {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare lastName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @HasOne(() => Inventory, 'userId')
    declare inventoryId?: number;
    @HasMany(() => Recipe, 'userId')
    declare recipeId?: number[];
    @HasMany(() => List, 'userId')
    declare listId?: number[];
}

export default User;
