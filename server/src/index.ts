import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import expressConfig from './config/express';
import initDb from './database/index';

dotenv.config();

const app: Application = express();

initDb()
    .then((): void => {
        expressConfig(app);
    })
    .catch((err): void => {
        if (err) {
            console.log(err.message);
        }
    });
