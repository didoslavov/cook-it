import { ValidationChain, body } from 'express-validator';

export const loginValidation: ValidationChain[] = [
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .toLowerCase()
        .trim()
        .isEmail()
        .withMessage('Email address is not valid!'),
    body('password').notEmpty().withMessage('Password is required!').trim(),
];

export const registerValidation: ValidationChain[] = [
    body('firstName').notEmpty().withMessage('First name is required!').trim(),
    body('lastName').notEmpty().withMessage('Last name is required!').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .toLowerCase()
        .trim()
        .isEmail()
        .withMessage('Email address is not valid!'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least 1 digit'),
];
