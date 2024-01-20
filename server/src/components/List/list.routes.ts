import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createList, getLists, getListById } from './list.controller';
import { nameValidation } from '../Shared';
const listRouter = Router();

listRouter.get('/', getLists);
listRouter.get('/:listId', getListById);
listRouter.post('/:listId/create', authMiddleware(), nameValidation, createList);

export default listRouter;
