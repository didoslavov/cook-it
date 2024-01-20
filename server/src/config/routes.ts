import { Application } from 'express';
import { userRouter } from '../components/User';
import { productRouter } from '../components/Product';
import inventoryRouter from '../components/Inventory/inventory.routes';

export default (app: Application): void => {
    app.use('/users', userRouter);
    app.use('/products', productRouter);
    app.use('/inventory', inventoryRouter);
};
