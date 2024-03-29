import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Ingredient, Recipe, RecipeData } from '../recipe.model';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { User } from '../../store/auth/user.model';
import { GenericFormData } from '../../shared/generic-form/generic-form.model';
import { RecipeService } from '../../services/recipe.service';
import { getUserData } from '../../store/auth/auth.selectors';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class RecipeFormComponent implements OnInit {
  ingredients: Ingredient[] = [];
  steps: string[] = [];
  user!: User;
  units: string[] = ['cup', 'tbsp', 'tsp', 'g', 'kg', 'l', 'ml', 'oz', 'pc'];

  recipeData: GenericFormData = {
    name: '',
    prepTime: undefined,
    cookTime: undefined,
    img: '',
    ingredient: undefined,
    quantity: '',
    unit: '',
    steps: undefined,
    description: '',
  };

  constructor(
    private router: Router,
    private store: Store,
    private recipeService: RecipeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user?.user;
    });
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

    this.recipeService.addRecipe(recipeData).subscribe({
      next: () => {
        this.notificationService.setNotification({
          message: `Recipe ${recipeData.name} created successfully.`,
          type: 'success',
        });
        this.router.navigate(['/recipes']);
      },
      error: (err) =>
        this.notificationService.setNotification({
          message: `There was a problem creating the recipe.
        ${err.message}`,
          type: 'error',
        }),
    });
  }
}
