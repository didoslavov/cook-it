import { Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';
import Product from './Product';

@Table({})
class UserProduct extends Model {
    @ForeignKey(() => User)
    userId: number = 0;

    @ForeignKey(() => Product)
    productId: number = 0;

    @BelongsTo(() => User)
    user: User | undefined;

    @BelongsTo(() => Product)
    product: Product | undefined;
}

export default UserProduct;
