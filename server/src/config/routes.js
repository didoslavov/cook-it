import { userRouter } from '../components/User';
import { errorHandlerMiddleware } from '../components/Shared';

export default (app) => {
    app.use(errorHandlerMiddleware);
    app.use('/users', userRouter);
};
