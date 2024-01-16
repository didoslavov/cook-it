import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response): void => {
    res.send('It works!');
});

app.listen(PORT, (): void => console.log('Server listening on port: ' + PORT));
