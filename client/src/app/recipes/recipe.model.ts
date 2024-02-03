export interface Recipe {
  name?: string;
  prepTime?: number;
  cookTime?: number;
  img?: string;
  ingredients?: string[];
  steps?: string[];
  description?: string;
}

export interface RecipeData extends Recipe {
  userId?: string;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}
