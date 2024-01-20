import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createList, getLists, getListById } from './list.controller';
import { listValidation } from './list.validations';
const listRouter = Router();

listRouter.get('/', getLists);
listRouter.get('/:listId', getListById);
listRouter.post('/:listId/create', authMiddleware(), listValidation, createList);

export default listRouter;
