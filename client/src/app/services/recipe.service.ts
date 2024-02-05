import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipeData } from '../recipes/recipe.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient, private router: Router) {}

  getRecipes(offset: number, limit: number) {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http
      .get<Recipe[]>('/recipes', { params })
      .pipe(tap((recipes) => recipes));
  }

  addRecipe(recipeData: RecipeData) {
    return this.http.post<RecipeData>('/recipes/create', recipeData);
  }
}
