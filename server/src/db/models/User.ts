import Recipe from './Recipe';
import List from './List';
import Inventory from './Inventory';
import { UserStorage } from '../../types/userStorage';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

@Table({})
class User extends Model implements UserStorage {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

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
