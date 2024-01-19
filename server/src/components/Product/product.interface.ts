export interface ProductInterface {
    id: string;
    name: string;
    quantity: number;
    userId?: number[];
    recipeId?: number[];
    listId?: number[];
}
