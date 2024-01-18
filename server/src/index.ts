import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import expressConfig from './config/express';
import initializeDatabase from './config/database/initialize';

dotenv.config();

const app: Application = express();

initializeDatabase()
    .then((): void => {
        expressConfig(app);
    })
    .catch((err): void => {
        if (err) {
            console.log(err.message);
        }
    });
