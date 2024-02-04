export interface ProductInterface {
    id?: string;
    name: string;
}

export interface Ingredient extends ProductInterface {
    quantity: number;
    unit: string;
}
