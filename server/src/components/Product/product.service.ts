import Product from './Product.model';
import { Ingredient, ProductInterface } from './product.interface';

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

export const insertIngredients = async (ingredients: Ingredient[]): Promise<ProductInterface[]> => {
    const createdProducts: Product[] = [];

    for (const ingredient of ingredients) {
        const existingProduct = await Product.findOne({ where: { name: ingredient.name } });

        if (existingProduct) {
            createdProducts.push(existingProduct);
        } else {
            const newProduct = await Product.create({ name: ingredient.name });
            createdProducts.push(newProduct);
        }
    }

    return createdProducts;
};
