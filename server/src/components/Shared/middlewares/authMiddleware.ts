import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserRequest, findUserById } from '../../User';
import { getBlacklistedToken } from '..';

const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    try {
        const [data, blackListedToken] = await Promise.all([verifyToken(token), getBlacklistedToken(token)]);

        if (blackListedToken) {
            throw new Error('blacklisted token');
        }

        if (typeof data === 'string') {
            throw new Error('Invalid token data');
        }

        const user = findUserById(data?.id);

        req.user = user;
        next();
    } catch (err: unknown) {
        if (err instanceof Error && err.message == 'blacklisted token') {
            return res.status(401).json({ message: 'Invalid token!' });
        }
    }
};

export default authMiddleware;
