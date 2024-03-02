import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserRequest, findUserById } from '../../User';
import { getBlacklistedToken } from '..';
import { TokenExpiredError } from 'jsonwebtoken';

const authMiddleware = (redirectUnauthenticated: boolean = true) => {
    return async (req: UserRequest, res: Response, next: NextFunction) => {
        const token = req.cookies.auth;

        try {
            const [data, blackListedToken] = await Promise.all([verifyToken(token), getBlacklistedToken(token)]);

            if (blackListedToken) {
                throw new Error('blacklisted token');
            }

            if (typeof data === 'string') {
                throw new Error('Invalid token data');
            }

            const user = await findUserById(data?.id);

            req.user = user;
            next();
        } catch (err) {
            if (!redirectUnauthenticated) {
                next();
                return;
            }

            if (
                err instanceof TokenExpiredError &&
                ['token expired', 'jwt must be provided', 'blacklisted token'].includes(err.message)
            ) {
                return res.status(401).send({ message: 'Invalid token!' });
            }
            next(err);
        }
    };
};

export default authMiddleware;
