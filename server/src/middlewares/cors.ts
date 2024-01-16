import { Response, Request, NextFunction } from 'express';

export default () =>
    (req: Request, res: Response, next: NextFunction): void => {
        const allowedOrigins = ['http://localhost:4200'];

        const origin: string | undefined = req.headers.origin;
        if (origin && allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Auth');
        res.setHeader('access-control-expose-headers', 'Set-Cookie');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        next();
    };
