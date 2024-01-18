import { Model, Table, ForeignKey, BelongsTo, DataType, Column } from 'sequelize-typescript';
import { Product } from '../../Product';
import { List } from '../../List';

@Table({
    tableName: 'list_product',
    modelName: 'ListProduct',
})
class ListProduct extends Model {
    @ForeignKey(() => List)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare listId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare productId: number;

    @BelongsTo(() => List)
    declare list: List;

    @BelongsTo(() => Product)
    declare product: Product;
}

export default ListProduct;
