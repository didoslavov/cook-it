import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe, RecipeData } from '../recipe.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { directionsState, ingredientsState } from '../../animations';
import { User } from '../../store/auth/user.model';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  animations: [ingredientsState, directionsState],
})
export class DetailsComponent implements OnInit {
  recipe: RecipeData = {};
  recipeId: string = '';
  showIngredients: boolean = true;
  showDirections: boolean = false;

  declare user: User | null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user?.user;
    });

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
