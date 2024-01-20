import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { InventoryInterface } from './inventory.inrerface';
import { findAllInventories, findInventoryByPk, insertInventory } from './inventory.service';
import { AppError } from '../Shared';

const createInventory = expressAsyncHandler(async (req: Request, res: Response) => {
    const inventoryData: InventoryInterface = req.body;

    const inventory = await insertInventory(inventoryData);

    if (!inventory) {
        throw new AppError(400, 'Adding inventory failed!');
    }

    res.status(200).json(inventory);
});

const getInventories = expressAsyncHandler(async (req: Request, res: Response) => {
    const inventories = await findAllInventories();

    if (!inventories) {
        throw new AppError(400, 'Error getting inventorys...');
    }

    if (!inventories.length) {
        throw new AppError(404, 'No inventorys found...');
    }

    res.status(200).json(inventories);
});

const getInventoryById = expressAsyncHandler(async (req: Request, res: Response) => {
    const inventoryId: string = req.params.inventoryId;
    const inventory = await findInventoryByPk(inventoryId);

    if (!inventory) {
        throw new AppError(400, 'No such inventory...');
    }

    res.status(200).json(inventory);
});

export { getInventories, createInventory, getInventoryById };
