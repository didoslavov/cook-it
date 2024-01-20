import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createProduct, getProductById, getProducts } from './product.controller';
import { nameValidation } from '../Shared';
const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/create', authMiddleware(), nameValidation, createProduct);

export default productRouter;
