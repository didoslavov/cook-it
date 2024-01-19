import { Model, Column, DataType, Table, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { Product } from '../Product';
import { ProductInventory } from '../Shared';
import { InventoryInterface } from './inventory.inrerface';
import { User } from '../User';

@Table({
    tableName: 'inventories',
    modelName: 'Inventory',
})
class Inventory extends Model<Inventory> implements InventoryInterface {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare name: string;

    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string;

    @BelongsTo(() => User, 'userId')
    declare user: User;

    @BelongsToMany(() => Product, () => ProductInventory)
    declare product: Product;
}

export default Inventory;
