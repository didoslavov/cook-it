import { Model, Table, ForeignKey, BelongsTo, DataType, Column } from 'sequelize-typescript';
import { Product } from '../../Product';
import { List } from '../../List';

@Table({
    tableName: 'list_product',
    modelName: 'ListProduct',
})
class ListProduct extends Model {
    @ForeignKey(() => List)
    @Column({ type: DataType.UUID, allowNull: false })
    declare listId: string;

    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID, allowNull: false })
    declare productId: string;

    @BelongsTo(() => List)
    declare list: List;

    @BelongsTo(() => Product)
    declare product: Product;
}

export default ListProduct;
