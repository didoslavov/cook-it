import { Model, Table, ForeignKey, BelongsTo, DataType, Column } from 'sequelize-typescript';
import List from './List';
import Product from './Product';

@Table({})
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
