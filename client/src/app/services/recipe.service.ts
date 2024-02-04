import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe, RecipeData } from '../recipes/recipe.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllRecipes() {
    return this.http.get<Recipe[]>('/recipes').pipe(tap((recipes) => recipes));
  }

  addRecipe(recipeData: RecipeData) {
    this.http.post<RecipeData>('/recipes/create', recipeData).subscribe({
      next: (res) => {
        console.log('Recipe added successfully:', res);
      },
      error: (err) => {
        console.error('Error adding recipe:', err);
      },
    });
  }
}