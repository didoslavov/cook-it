import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createInventory, getInventories, getInventoryById } from './inventory.controller';
const inventoryRouter = Router();

inventoryRouter.get('/', getInventories);
inventoryRouter.get('/:inventoryId', getInventoryById);
inventoryRouter.post('/:inventoryId/create', createInventory);

export default inventoryRouter;
