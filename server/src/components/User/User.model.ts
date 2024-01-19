import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { UserInterface } from './';
import { Inventory } from '../Inventory';
import { Recipe } from '../Recipe';
import { List } from '../List';
import { UserList } from '../Shared';

@Table({
    tableName: 'user',
    modelName: 'User',
})
class User extends Model<User> implements UserInterface {
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
    declare inventoryId: number;
    @HasMany(() => Recipe, 'userId')
    declare recipes: Recipe[];
    @BelongsToMany(() => List, () => UserList)
    declare listId: number[];
}

export default User;
