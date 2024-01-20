import Product from './Product.model';
import { ProductInterface } from './product.interface';

export const getAllProducts = async (): Promise<ProductInterface[]> => {
    return Product.findAll().then((products): ProductInterface[] => products.map((p): ProductInterface => p.toJSON()));
};

export const insertProduct = async (product: ProductInterface): Promise<ProductInterface> => {
    return Product.create(product).then((createdProduct): ProductInterface => createdProduct.toJSON());
};
