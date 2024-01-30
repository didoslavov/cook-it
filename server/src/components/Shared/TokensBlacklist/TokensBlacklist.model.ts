import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { BlackListed } from './tokensBlacklist.interface';

@Table({
    tableName: 'blacklisted',
    modelName: 'TokensBlacklist',
    timestamps: false,
})
class TokensBlacklist extends Model<BlackListed> {
    @PrimaryKey
    @Column({ type: DataType.STRING(767) })
    declare token: string;
}

export default TokensBlacklist;
