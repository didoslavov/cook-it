import userRouter from '../routes/usersRoutes';
import errorHandler from '../middlewares/errorHandler.js';

export default (app) => {
    app.use('/users', userRouter);
    app.use(errorHandler);
};
