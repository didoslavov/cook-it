import { Router } from 'express';
import authMiddleware from '../Shared/middlewares/authMiddleware';
import { createProduct, getProducts } from './product.controller';
const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/create', createProduct);

export default productRouter;
