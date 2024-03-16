import { WhereOptions } from 'sequelize';
import { Ingredient } from '../Product';

export interface RecipeInterface {
    id?: string;
    name: string;
    prepTime: number;
    cookTime: number;
    img: string;
    description: string;
    userId: string;
    like?: Like;
    bookmark?: Bookmark;
}

export interface RecipeData extends RecipeInterface {
    ingredients: Ingredient[];
    steps: string[];
}

export type CustomWhereOptions = WhereOptions<RecipeInterface> & {
    ingredients?: string[];
};

export interface Like {
    liked: boolean;
    likesCount: number;
}

export interface Bookmark {
    bookmarked: boolean;
    bookmarksCount: number;
}
