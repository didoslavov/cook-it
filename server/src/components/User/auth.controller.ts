import expressAsyncHandler from 'express-async-handler';
import { createUser, findUserByEmail, UserInterface } from '.';
import { Request, Response } from 'express';
import { AppError, blackListToken, comparePasswords, createToken } from '../Shared';

const register = expressAsyncHandler(async (req, res): Promise<void> => {
    const userData: UserInterface = req.body;

    const duplicateUser = await findUserByEmail(userData.email);

    if (duplicateUser) {
        throw new AppError(409, 'User already exist!');
    }

    const user = await createUser(userData);

    if (!user) {
        throw new AppError(400, 'Registration faild!');
    }

    const token = createToken(user);

    res.cookie('auth', token, { httpOnly: true, sameSite: 'none', secure: false });
    res.status(200).json(user);
});

const login = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError(401, "User or password don't match!");
    }

    const isPasswordMatch = await comparePasswords(user.password, password);

    if (!isPasswordMatch) {
        throw new AppError(401, "User or password don't match!");
    }

    const token = createToken(user);
    const userData = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };

    res.cookie('auth', token, { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).json({ user: userData });
});

const logout = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.auth;

    const blacklisted = await blackListToken(token);

    if (!blacklisted) {
        throw new AppError(401, 'Something went wrong, token not blacklistet');
    }

    res.clearCookie('auth');
    res.status(204).json({ message: 'Logged out!' });
});

export { register, login, logout };
