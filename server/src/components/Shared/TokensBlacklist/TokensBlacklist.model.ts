import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { BlackListed } from './tokenBlacklist.interface';

@Table({
    tableName: 'blacklisted',
    modelName: 'TokensBlacklist',
})
class TokensBlacklist extends Model<BlackListed> {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare token: string;
}

export default TokensBlacklist;
