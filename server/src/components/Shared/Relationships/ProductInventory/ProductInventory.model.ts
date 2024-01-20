import { Model, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Product } from '../../../Product';
import { Inventory } from '../../../Inventory';
import { ProductInventoryInterface } from '../..';

@Table({
    tableName: 'product_inventory',
    modelName: 'ProductInventory',
})
class ProductInventory extends Model<ProductInventory> implements ProductInventoryInterface {
    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID, allowNull: false })
    declare productId: string;

    @ForeignKey(() => Inventory)
    @Column({ type: DataType.UUID, allowNull: false })
    declare inventoryId: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    declare quantity: number;
}

export default ProductInventory;
