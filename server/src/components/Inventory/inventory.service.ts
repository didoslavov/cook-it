import Inventory from './Inventory.model';
import { InventoryInterface } from './inventory.inrerface';

export const findAllInventories = async (): Promise<InventoryInterface[]> => {
    const inventories = await Inventory.findAll();
    return inventories.map((p): InventoryInterface => p.toJSON());
};

export const insertInventory = async (inventory: InventoryInterface): Promise<InventoryInterface> => {
    const createdInventory = await Inventory.create(inventory);
    return createdInventory.toJSON();
};

export const findInventoryByPk = async (inventoryId: string): Promise<InventoryInterface | undefined> => {
    const inventory = await Inventory.findByPk(inventoryId);
    return inventory?.toJSON();
};
