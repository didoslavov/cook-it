import { Sequelize } from 'sequelize-typescript';
import { List } from '../../components/List';
import { User } from '../../components/User';
import { Product } from '../../components/Product';
import { Recipe } from '../../components/Recipe';
import { Inventory } from '../../components/Inventory';
import { ProductInventory, ProductList, ProductRecipe, TokensBlacklist, UserList } from '../../components/Shared';
import StepRecipe from '../../components/Shared/Relationships/StepRecipe/StepRecipe.model';
import { Step } from '../../components/Step';
import Like from '../../components/Shared/Relationships/Like/LikeRecipe.model';
import BookmarkRecipe from '../../components/Shared/Relationships/BookmarkRecipe/BookmarkRecipe.model';

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: 'mysql',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    ssl: true,
    models: [
        User,
        Product,
        Recipe,
        Step,
        List,
        Like,
        BookmarkRecipe,
        Inventory,
        UserList,
        ProductRecipe,
        ProductList,
        ProductInventory,
        TokensBlacklist,
        StepRecipe,
    ],
});

export default sequelize;
