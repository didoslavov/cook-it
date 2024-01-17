export interface RecipeStorage {
    id: number;
    name: string;
    steps: string;
    prepTime: number;
    cookTime: number;
    img: string;
    userId?: number[];
    productId?: number[];
    listId?: number[];
}
