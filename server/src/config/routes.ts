import { Application } from 'express';
import { userRouter } from '../components/User';

export default (app: Application): void => {
    app.use('/users', userRouter);
};
