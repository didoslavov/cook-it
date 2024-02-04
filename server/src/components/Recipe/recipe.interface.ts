export interface RecipeInterface {
    id: string;
    name: string;
    steps: string;
    prepTime: number;
    cookTime: number;
    img: string;
    userId: string;
}

export interface RecipeData extends RecipeInterface {
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}
