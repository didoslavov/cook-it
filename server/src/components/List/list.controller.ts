import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ListInterface } from './list.interface';
import { findAllLists, findListByPk, insertList } from './list.service';
import { AppError } from '../Shared';

const createList = expressAsyncHandler(async (req: Request, res: Response) => {
    const listData: ListInterface = req.body;

    const list = await insertList(listData);

    if (!list) {
        throw new AppError(400, 'Adding list failed!');
    }

    res.status(200).json(list);
});

const getLists = expressAsyncHandler(async (req: Request, res: Response) => {
    const lists = await findAllLists();

    if (!lists) {
        throw new AppError(400, 'Error getting lists...');
    }

    if (!lists.length) {
        throw new AppError(404, 'No lists found...');
    }

    res.status(200).json(lists);
});

const getListById = expressAsyncHandler(async (req: Request, res: Response) => {
    const listId: string = req.params.listId;
    const list = await findListByPk(listId);

    if (!list) {
        throw new AppError(400, 'No such list...');
    }

    res.status(200).json(list);
});

export { getLists, createList, getListById };
