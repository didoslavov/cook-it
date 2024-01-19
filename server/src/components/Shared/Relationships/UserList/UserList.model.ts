import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../../User';
import { List } from '../../../List';
import { UserListInterface } from '../../../Shared';

@Table({
    tableName: 'user_list',
    modelName: 'UserList',
})
class UserList extends Model<UserList> implements UserListInterface {
    @Column({ type: DataType.UUID, allowNull: false })
    @ForeignKey(() => User)
    declare userId: string;

    @Column({ type: DataType.UUID, allowNull: false })
    @ForeignKey(() => List)
    declare listId: string;
}

export default UserList;
