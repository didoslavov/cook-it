export interface ProductStorage {
    id: string;
    name: string;
    quantity: number;
    userId?: number[];
    recipeId?: number[];
    listId?: number[];
}
