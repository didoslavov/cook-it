import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  recipe: Recipe = {};
  recipeId: string = '';
  showIngredients: boolean = true;
  showDirections: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.recipeId = params['recipeId'];

      if (this.recipeId) {
        this.recipeService
          .getRecipeById(this.recipeId)
          .subscribe((recipe) => (this.recipe = recipe));
      }
    });
  }

  onToggleIngredients() {
    if (this.showDirections) {
      this.showIngredients = !this.showIngredients;
      this.showDirections = !this.showDirections;
    }
  }

  onToggleDirections() {
    if (this.showIngredients) {
      this.showDirections = !this.showDirections;
      this.showIngredients = !this.showIngredients;
    }
  }
}
