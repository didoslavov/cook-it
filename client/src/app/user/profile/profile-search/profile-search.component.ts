import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../recipes/recipe.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [ReactiveFormsModule, CarouselComponent],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
})
export class ProfileHomeComponent implements OnInit {
  searchForm: FormGroup;
  recipes: Recipe[] | null = [];
  ingredients: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.searchForm.valid) {
      const searchQuery = this.searchForm.value.searchQuery;
      this.ingredients = searchQuery
        .split(',')
        .map((ingredient: string) => ingredient.trim());

      let params = new HttpParams();
      this.ingredients.forEach((ingredient: string) => {
        params = params.append('ingredients', ingredient);
      });

      this.recipeService.searchRecipesByIngredients(params).subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        },
        error: (error) => {
          console.error('Error searching recipes:', error);
        },
      });
    }
  }
}
