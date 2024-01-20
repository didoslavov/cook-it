import { Model, DataType, Table, Column, BelongsToMany } from 'sequelize-typescript';
import { User } from '../User';
import { Product } from '../Product';
import { ProductList, UserList } from '../Shared';
import { ListInterface } from './list.interface';

@Table({
    tableName: 'lists',
    modelName: 'List',
})
class List extends Model<ListInterface> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @BelongsToMany(() => User, () => UserList)
    declare user: User[];

    @BelongsToMany(() => Product, () => ProductList)
    declare products: Product[];
}

export default List;
