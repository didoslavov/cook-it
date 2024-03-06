export interface Recipe {
  id?: string;
  name?: string;
  prepTime?: number;
  cookTime?: number;
  img?: string;
  ingredients?: Ingredient[];
  steps?: string[];
  description?: string;
  userId?: string;
}

export interface RecipeData {
  recipes: Recipe[];
  count: number;
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

export interface NewsData {
  author: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
    id: string;
  };
}
