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
  like?: { liked: boolean; likesCount: number };
  likes?: { userId: string }[];
  bookmarks?: { userId: string }[];
  bookmark?: { bookmarked: boolean; bookmarksCount: number };
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

export interface Like {
  liked: boolean;
  likesCount: number;
}
export interface Bookmark {
  bookmarked: boolean;
  bookmarksCount: number;
}
