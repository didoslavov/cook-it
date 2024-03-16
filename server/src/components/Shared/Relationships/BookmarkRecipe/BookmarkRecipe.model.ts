import { Model, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { User } from '../../../User';
import { Recipe } from '../../../Recipe';
import { BookmarkInterface } from './bookmarkRecipe.interface';

@Table({
    tableName: 'bookmarks',
    modelName: 'BookmarkRecipe',
})
class BookmarkRecipe extends Model<BookmarkInterface> {
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    declare userId: string;

    @ForeignKey(() => Recipe)
    @Column({ type: DataType.UUID, allowNull: false })
    declare recipeId: string;
}

export default BookmarkRecipe;
