import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselComponent } from '../shared/carousel/carousel.component';
import { RecipeData } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: RecipeData[] = [];
  private subscription!: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.getAllRecipes().subscribe({
      next: (recipes: RecipeData[]) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
