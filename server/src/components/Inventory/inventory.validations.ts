import { ValidationChain, body } from 'express-validator';

export const inventoryValidation: ValidationChain[] = [body('name').notEmpty().withMessage('Inventory name is required!').trim()];
