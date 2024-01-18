import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/appError';

const errorHandlerMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response<any, Record<string, any>> => {
    if (error instanceof AppError) {
        console.error(error);
        return res.status(error.status).json({ error: error.message });
    } else {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default errorHandlerMiddleware;
