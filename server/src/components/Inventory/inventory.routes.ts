import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createInventory, getInventories, getInventoryById } from './inventory.controller';
import { inventoryValidation } from './inventory.validations';
const inventoryRouter = Router();

inventoryRouter.get('/', getInventories);
inventoryRouter.get('/:inventoryId', getInventoryById);
inventoryRouter.post('/create', authMiddleware(), inventoryValidation, createInventory);

export default inventoryRouter;
