import * as dotenv from 'dotenv';
import { urlencoded, json, Application } from 'express';
import cookieParser from 'cookie-parser';
import { cors, errorHandlerMiddleware } from '../components/Shared';

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

export default (app: Application): void => {
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(cors());
    app.use(cookieParser());
    app.use(errorHandlerMiddleware);

    app.listen(PORT, (): void => console.log(`Server Running on port: ${PORT}`));
};
