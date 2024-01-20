import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { findAllUsers, updateById } from './user.service';
import { AppError } from '../Shared';
import { UserInterface } from './user.interface';

const getUsers = expressAsyncHandler(async (req: Request, res: Response) => {
    const users: UserInterface[] = await findAllUsers();

    if (!users.length) {
        throw new AppError(404, 'No users found!');
    }

    res.status(200).json(users);
});

const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updateData = Object.keys(req.body).reduce((acc, key) => {
        if (!req.body[key] || req.body[key] !== '') {
            acc[key] = req.body[key];
        }

        return acc;
    }, {} as Record<string, string | number>);

    const updatedUser = await updateById(userId, updateData);

    if (!updatedUser) {
        throw new AppError(404, 'User not found!');
    }

    res.status(200).json(updatedUser);
});

export { updateUser, getUsers };
