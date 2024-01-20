import { ValidationChain, body } from 'express-validator';

export const listValidation: ValidationChain[] = [body('name').notEmpty().withMessage('Inventory name is required!').trim()];
