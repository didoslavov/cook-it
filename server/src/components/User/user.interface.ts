export interface UserStorage {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    inventory?: number;
    recipeId?: number[];
    listId?: number[];
}
