import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

interface UserRequest extends Request {
    user?: object;
}

const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    try {
        const data = verifyToken(token);

        req.user = data;
    } catch (err) {
        res.clearCookie(token);

        return res.status(403).json({ message: 'Invalid token!' });
    }
    next();
};

export default authMiddleware;
