export interface Recipe {
  id?: string;
  name?: string;
  prepTime?: number;
  cookTime?: number;
  img?: string;
  ingredients?: Ingredient[];
  steps?: string[];
  description?: string;
}

export interface RecipeData extends Recipe {
  userId?: string;
}

export interface Step {
  step: string;
}

export interface Ingredient {
  name: string;
  ProductRecipe: {
    quantity: string;
    unit: string;
  };
}

export interface IngredientWithId extends Ingredient {
  id?: string;
}
