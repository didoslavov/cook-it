import { Model, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Product } from '../../../Product';
import { List } from '../../../List';
import { ProductListInterface } from '../../../Shared';

@Table({
    tableName: 'product_list',
    modelName: 'ProductList',
})
class ProductList extends Model<ProductList> implements ProductListInterface {
    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID, allowNull: false })
    declare productId: string;

    @ForeignKey(() => List)
    @Column({ type: DataType.UUID, allowNull: false })
    declare listId: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    declare quantity: string;
}

export default ProductList;
