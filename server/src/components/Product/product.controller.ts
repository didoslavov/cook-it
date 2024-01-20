import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ProductInterface } from './product.interface';
import { findAllProducts, findProductByPk, insertProduct } from './product.service';
import { AppError, mapValidationError } from '../Shared';
import { validationResult } from 'express-validator';

const createProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const validations = validationResult(req);
    const errors = validations.array();

    if (errors.length) {
        throw new AppError(400, errors.map(mapValidationError).join('; '));
    }

    const productData: ProductInterface = req.body;

    const product = await insertProduct(productData);

    if (!product) {
        throw new AppError(400, 'Adding product failed!');
    }

    res.status(200).json(product);
});

const getProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const products = await findAllProducts();

    if (!products) {
        throw new AppError(400, 'Error getting products...');
    }

    if (!products.length) {
        throw new AppError(404, 'No products found...');
    }

    res.status(200).json(products);
});

const getProductById = expressAsyncHandler(async (req: Request, res: Response) => {
    const productId: string = req.params.productId;
    const product = await findProductByPk(productId);

    if (!product) {
        throw new AppError(400, 'No such product...');
    }

    res.status(200).json(product);
});

export { getProducts, createProduct, getProductById };
