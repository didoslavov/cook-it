import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createList, getLists, getListById } from './list.controller';
const listRouter = Router();

listRouter.get('/', getLists);
listRouter.get('/:listId', getListById);
listRouter.post('/:listId/create', createList);

export default listRouter;
