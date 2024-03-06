import { Component } from '@angular/core';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { Ingredient, Recipe, RecipeData } from '../recipe.model';
import { User } from '../../store/auth/user.model';
import { GenericFormData } from '../../shared/generic-form/generic-form.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RecipeService } from '../../services/recipe.service';
import { getUserData } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-edit-recipe-form',
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: './edit-recipe-form.component.html',
  styleUrl: './edit-recipe-form.component.scss',
})
export class EditRecipeFormComponent {
  ingredients: Ingredient[] = [];
  steps: string[] = [];
  user!: User;
  units: string[] = ['cup', 'tbsp', 'tsp', 'g', 'kg', 'l', 'ml', 'oz', 'pc'];
  recipe: Recipe = {};
  recipeId: string = '';

  recipeData: GenericFormData = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user?.user;
    });

    this.route.params.subscribe((params) => {
      this.recipeId = params['recipeId'];
      this.fetchRecipe(this.recipeId);
    });
  }

  fetchRecipe(recipeId: string): void {
    this.recipeService.getRecipeById(recipeId).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;

        this.populateFormData();
      },
      (error) => {
        console.error('Error fetching recipe:', error);
      }
    );
  }

  populateFormData(): void {
    this.ingredients = this.recipe.ingredients || [];
    this.steps = this.recipe.steps || [];
  }

  onAddIngredient(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
  }

  onUpdateIngredients(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
  }

  onAddStep(step: string) {
    this.steps.push(step);
  }

  onUpdateSteps(steps: string[]): void {
    this.steps = steps;
  }

  onSubmit(formData: Recipe): void {
    const recipeData = {
      name: formData.name,
      prepTime: Number(formData.prepTime),
      cookTime: Number(formData.cookTime),
      img: formData.img,
      ingredients: this.ingredients,
      steps: this.steps,
      description: formData.description,
      userId: this.user?.id,
    };

    this.recipeService.editRecipe(this.recipeId, recipeData).subscribe({
      next: (v) => this.router.navigate([`/recipes/${this.recipeId}/details`]),
      error: (err) => console.error(err),
    });
  }
}
