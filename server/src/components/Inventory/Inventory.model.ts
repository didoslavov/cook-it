import { Model, Column, DataType, Table, BelongsToMany } from 'sequelize-typescript';
import { Product } from '../Product';
import { ProductInventory } from '../Shared';
import { InventoryInterface } from './inventory.inrerface';

@Table({
    tableName: 'inventories',
    modelName: 'Inventory',
})
class Inventory extends Model<Inventory> implements InventoryInterface {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @BelongsToMany(() => Product, () => ProductInventory)
    declare product: Product;
}

export default Inventory;
