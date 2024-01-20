import { ValidationChain, body } from 'express-validator';

export const nameValidation: ValidationChain[] = [body('name').notEmpty().withMessage('Inventory name is required!').trim()];
