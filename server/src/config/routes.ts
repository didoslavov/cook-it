import { Application } from 'express';
import { userRouter } from '../components/User';
import { productRouter } from '../components/Product';

export default (app: Application): void => {
    app.use('/users', userRouter);
    app.use('/products', productRouter);
};
