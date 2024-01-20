import Product from './Product.model';
import { ProductInterface } from './product.interface';

export const findAllProducts = async (): Promise<ProductInterface[]> => {
    const products = await Product.findAll();
    return products.map((p): ProductInterface => p.toJSON());
};

export const insertProduct = async (product: ProductInterface): Promise<ProductInterface> => {
    const createdProduct = await Product.create(product);
    return createdProduct.toJSON();
};

export const findProductByPk = async (productId: string): Promise<ProductInterface | undefined> => {
    const product = await Product.findByPk(productId);
    return product?.toJSON();
};
