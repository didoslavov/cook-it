import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark, Like, Recipe, RecipeData } from '../recipes/recipe.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getLatestNews(page: number, pageSize: number = 20) {
    const params = new HttpParams()
      .set('q', 'kitchen recipes home cooking recipe ingredients')
      .set('pageSize', pageSize.toString())
      .set('page', page.toString())
      .set('apikey', environment.newsApiKey);

    return this.http
      .get<any>(environment.newsApiUrl, { params })
      .pipe(tap((news) => news));
  }

  searchRecipesByIngredients(params: HttpParams) {
    return this.http
      .get<RecipeData>('/recipes/search', { params })
      .pipe(tap((recipes) => recipes));
  }

  getRecipes(params: HttpParams) {
    return this.http
      .get<RecipeData>('/recipes', { params })
      .pipe(tap((recipes) => recipes));
  }

  getUserRecipes(params: HttpParams) {
    return this.http
      .get<RecipeData>('/users/recipes', { params })
      .pipe(tap((recipes) => recipes));
  }

  getRecipeById(recipeId: string) {
    return this.http
      .get<Recipe>('/recipes/' + recipeId)
      .pipe(tap((recipe) => recipe));
  }

  addRecipe(recipeData: Recipe) {
    return this.http.post<RecipeData>('/recipes/create', recipeData);
  }

  editRecipe(recipeId: string, recipeData: Recipe) {
    return this.http.put<RecipeData>(`/recipes/${recipeId}/edit`, recipeData);
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete<RecipeData>(`/recipes/${recipeId}/delete`);
  }

  likeRecipe(recipeId: string) {
    return this.http.post<Like>(`/recipes/${recipeId}/like`, {});
  }

  removeLike(recipeId: string) {
    return this.http.delete<Like>(`/recipes/${recipeId}/like/delete`);
  }

  bookmarkRecipe(recipeId: string) {
    return this.http.post<Bookmark>(`/recipes/${recipeId}/bookmark`, {});
  }

  removeBookmark(recipeId: string) {
    return this.http.delete<Bookmark>(`/recipes/${recipeId}/bookmark/delete`);
  }

  getUserLikedRecipes(params: HttpParams) {
    return this.http
      .get<RecipeData>('/users/recipes/liked', { params })
      .pipe(tap((recipes) => recipes));
  }

  getUserBookmarkedRecipes(params: HttpParams) {
    return this.http
      .get<RecipeData>('/users/recipes/bookmarked', { params })
      .pipe(tap((recipes) => recipes));
  }
}
