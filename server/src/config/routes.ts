import { Application } from 'express';
import { userRouter } from '../components/User';
import { productRouter } from '../components/Product';
import { recipeRouter } from '../components/Recipe';
import { inventoryRouter } from '../components/Inventory';
import { listRouter } from '../components/List';

export default (app: Application): void => {
    app.use('/users', userRouter);
    app.use('/products', productRouter);
    app.use('/inventory', inventoryRouter);
    app.use('/recipes', recipeRouter);
    app.use('/lists', listRouter);
};
