import { Component } from '@angular/core';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { GenericFormData } from '../../shared/generic-form/generic-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class RecipeFormComponent {
  ingredients: string[] = [];
  steps: string[] = [];

  recipeData: GenericFormData = {
    name: '',
    prepTime: '',
    cookTime: '',
    img: '',
    ingredients: '',
    steps: '',
    description: '',
  };

  constructor(private router: Router) {}

  onAddIngredient(ingredient: string): void {
    this.ingredients.push(ingredient);
  }

  onUpdateIngredients(ingredients: string[]): void {
    this.ingredients = ingredients;
  }

  onAddStep(step: string) {
    this.steps.push(step);
  }

  onUpdateSteps(steps: string[]): void {
    this.steps = steps;
  }

  onSubmit(formData: GenericFormData): void {
    const recipeData = { ...formData };

    // this.router.navigate(['/']);
  }
}
