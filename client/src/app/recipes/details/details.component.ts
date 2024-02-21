import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  recipe: Recipe = {};
  recipeId: string = '';

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
}
