import { Sequelize } from 'sequelize-typescript';
import { List } from '../../components/List';
import { User } from '../../components/User';
import { Product } from '../../components/Product';
import { Recipe } from '../../components/Recipe';
import { Inventory } from '../../components/Inventory';
import { ProductInventory, ProductList, RecipeProduct, UserList } from '../../components/Shared';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [User, Product, List, Recipe, Inventory, UserList, RecipeProduct, ProductList, ProductInventory],
});

export default sequelize;
