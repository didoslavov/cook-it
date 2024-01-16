import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import expressConfig from './config/express';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

expressConfig(app);
