import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import expressConfig from './config/express';
import initDb from './db/index';

dotenv.config();

const app: Application = express();

initDb().then((): void => {
    expressConfig(app);
});
