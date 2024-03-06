import { Component, OnInit } from '@angular/core';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { GenericFormData } from '../../shared/generic-form/generic-form.model';
import { Router } from '@angular/router';
import { User } from '../../store/auth/user.model';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient, Recipe, RecipeData } from '../recipe.model';

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
    private recipeService: RecipeService
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
      next: (v) => this.router.navigate(['/recipes']),
      error: (err) => console.error(err),
    });
  }
}
