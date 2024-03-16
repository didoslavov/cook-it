import { BeforeSave, BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { UserInterface } from './';
import { Inventory } from '../Inventory';
import { Recipe } from '../Recipe';
import { List } from '../List';
import { UserList, hashPassword } from '../Shared';
import LikeRecipe from '../Shared/Relationships/Like/LikeRecipe.model';
import BookmarkRecipe from '../Shared/Relationships/BookmarkRecipe/BookmarkRecipe.model';

@Table({
    tableName: 'users',
    modelName: 'User',
})
class User extends Model<UserInterface> {
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    declare id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare lastName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare avatar: string | undefined;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @HasOne(() => Inventory, 'userId')
    declare inventoryId: number;
    @HasMany(() => Recipe, 'userId')
    declare recipes: Recipe[];
    @BelongsToMany(() => List, () => UserList)
    declare listId: number[];
    @BelongsToMany(() => Recipe, () => LikeRecipe)
    declare likedRecipes: Recipe[];
    @BelongsToMany(() => Recipe, () => BookmarkRecipe)
    declare savedRecipes: Recipe[];

    @BeforeSave
    static async hashUserPassword(user: User, options: any): Promise<void> {
        if (user.changed('password')) {
            user.password = await hashPassword(user.password);
        }
    }
}

export default User;
