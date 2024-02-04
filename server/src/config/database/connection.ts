import { Sequelize } from 'sequelize-typescript';
import { List } from '../../components/List';
import { User } from '../../components/User';
import { Product } from '../../components/Product';
import { Recipe } from '../../components/Recipe';
import { Inventory } from '../../components/Inventory';
import { ProductInventory, ProductList, ProductRecipe, TokensBlacklist, UserList } from '../../components/Shared';
import StepRecipe from '../../components/Shared/Relationships/StepRecipe/StepRecipe.model';
import { Step } from '../../components/Step';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [
        User,
        Product,
        Step,
        List,
        Recipe,
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
