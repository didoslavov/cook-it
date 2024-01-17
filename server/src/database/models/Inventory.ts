import { Model, Column, DataType, Table, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript';
import Product from './Product';
import User from './User';
import { InventoryStorage } from '../../types/inventoryStorage';

@Table({
    tableName: 'inventories',
    modelName: 'Inventory',
})
class Inventory extends Model implements InventoryStorage {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column(DataType.STRING)
    declare name: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    declare userId: number;

    @BelongsTo(() => User, 'userId')
    declare user: User;

    @HasMany(() => Product, 'inventoryId')
    declare products: Product;
}

export default Inventory;
