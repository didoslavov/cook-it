import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createInventory, getInventories, getInventoryById } from './inventory.controller';
import { nameValidation } from '../Shared';
const inventoryRouter = Router();

inventoryRouter.get('/', getInventories);
inventoryRouter.get('/:inventoryId', getInventoryById);
inventoryRouter.post('/create', authMiddleware(), nameValidation, createInventory);

export default inventoryRouter;
