import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipeData } from '../recipes/recipe.model';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  getRecipes(params: HttpParams) {
    return this.http
      .get<Recipe[]>('/recipes', { params })
      .pipe(tap((recipes) => recipes));
  }

  getUserRecipes(params: HttpParams) {
    return this.http
      .get<Recipe[]>('/user/recipes', { params })
      .pipe(tap((recipes) => recipes));
  }

  getRecipeById(recipeId: string) {
    return this.http
      .get<Recipe>('/recipes/' + recipeId)
      .pipe(tap((recipe) => recipe));
  }

  addRecipe(recipeData: RecipeData) {
    return this.http.post<RecipeData>('/recipes/create', recipeData);
  }

  editRecipe(recipeId: string, recipeData: RecipeData) {
    return this.http.put<RecipeData>(`/recipes/${recipeId}/edit`, recipeData);
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete<RecipeData>(`/recipes/${recipeId}/delete`);
  }
}
