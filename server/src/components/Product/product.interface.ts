export interface ProductStorage {
    id: number;
    name: string;
    quantity: number;
    userId?: number[];
    recipeId?: number[];
    listId?: number[];
}
