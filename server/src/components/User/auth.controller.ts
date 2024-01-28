import expressAsyncHandler from 'express-async-handler';
import { createUser, findUserByEmail, UserInterface } from '.';
import { Request, Response } from 'express';
import { AppError, blackListToken, comparePasswords, createToken, mapValidationError } from '../Shared';
import { validationResult } from 'express-validator';

const register = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userData: UserInterface = req.body;

    const validations = validationResult(req);
    const errors = validations.array();

    if (errors.length) {
        throw new AppError(400, errors.map(mapValidationError).join('; '));
    }

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
    const validations = validationResult(req);
    const errors = validations.array();

    if (errors.length) {
        throw new AppError(400, errors.map(mapValidationError).join('; '));
    }

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

    res.cookie('auth', token, { httpOnly: true, sameSite: 'none', secure: false });

    res.status(200).json({ user: userData });
});

const logout = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.auth;

    const blacklisted = await blackListToken(token);

    if (!blacklisted) {
        throw new AppError(500, 'Something went wrong, please try again.');
    }

    res.clearCookie('auth');
    res.status(204).json({ message: 'Logged out!' });
});

export { register, login, logout };
