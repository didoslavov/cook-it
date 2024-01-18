import { Model, DataType, Table, BelongsTo, HasMany, Column } from 'sequelize-typescript';
import { User } from '../User';
import { Product } from '../Product';

@Table({
    tableName: 'lists',
    modelName: 'List',
})
class List extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @BelongsTo(() => User, 'userId')
    declare user: User;

    @HasMany(() => Product, 'productId')
    declare products: Product[];
}

export default List;
