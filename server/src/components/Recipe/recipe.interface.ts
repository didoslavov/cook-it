import { WhereOptions } from 'sequelize';
import { Ingredient } from '../Product';
import { StepInterface } from '../Step';

export interface RecipeInterface {
    id?: string;
    name: string;
    prepTime: number;
    cookTime: number;
    img: string;
    description: string;
    userId: string;
}

export interface RecipeData extends RecipeInterface {
    ingredients: Ingredient[];
    steps: string[];
}

export type CustomWhereOptions = WhereOptions<RecipeInterface> & {
    ingredients?: string[];
};
