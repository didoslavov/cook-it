export interface ProductInterface {
    id?: string;
    name: string;
    ProductRecipe: {
        quantity?: string;
        unit?: string;
    };
}

export interface Ingredient extends ProductInterface {
    ProductRecipe: {
        quantity?: string;
        unit?: string;
    };
}
