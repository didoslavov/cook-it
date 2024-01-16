import * as dotenv from 'dotenv';
import { urlencoded, json, Application } from 'express';
import cors from '../middlewares/cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT: string | number = process.env.PORT || 3000;

export default (app: Application): void => {
    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(cors());
    app.use(cookieParser());

    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
};
