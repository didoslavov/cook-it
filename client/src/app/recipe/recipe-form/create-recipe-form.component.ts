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

  onSubmit(formData: GenericFormData): void {
    const recipeData = { ...formData };

    // this.router.navigate(['/']);
  }
}
