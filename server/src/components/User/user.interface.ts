export interface UserStorage {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    inventory?: number;
    recipeId?: number[];
    listId?: number[];
}
