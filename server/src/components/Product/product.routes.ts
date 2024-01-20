import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createProduct, getProductById, getProducts } from './product.controller';
const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/create', createProduct);

export default productRouter;
