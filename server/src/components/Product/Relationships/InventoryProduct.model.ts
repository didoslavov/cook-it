import { Model, Table, ForeignKey, BelongsTo, DataType, Column } from 'sequelize-typescript';
import { Inventory } from '../../Inventory';
import { Product } from '../../Product';

@Table({
    tableName: 'inventory_product',
    modelName: 'ListProduct',
})
class InventoryProduct extends Model {
    @ForeignKey(() => Inventory)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare inventoryId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare productId: number;

    @BelongsTo(() => Inventory)
    declare inventory: Inventory;

    @BelongsTo(() => Product)
    declare product: Product;
}

export default InventoryProduct;
