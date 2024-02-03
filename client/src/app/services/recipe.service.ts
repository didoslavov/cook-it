import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipeData } from '../recipes/recipe.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  declare recipe: Recipe;
  constructor(private http: HttpClient, private router: Router) {}

  getAllRecipes() {
    return this.http.get<Recipe[]>('/recipes').pipe(tap((recipes) => recipes));
  }

  addRecipe(recipeData: RecipeData) {
    return this.http
      .post<Recipe>('/recipes/create', recipeData)
      .pipe(tap(() => this.router.navigate(['/recipes'])));
  }
}
