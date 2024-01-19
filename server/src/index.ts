import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import expressConfig from './config/express';
import { initializeDatabase, router } from './config';

dotenv.config();

const app: Application = express();

initializeDatabase()
    .then((): void => {
        expressConfig(app);
        router(app);
    })
    .catch((err): void => {
        if (err) {
            console.log(err.message);
        }
    });
