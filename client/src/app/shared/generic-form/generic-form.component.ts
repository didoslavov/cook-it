import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GenericFormData, GenericFormModel } from './generic-form.model';
import { RouterLink } from '@angular/router';
import { faListOl, faPlus, faSpoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ingredient } from '../../recipes/recipe.model';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FontAwesomeModule],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  @Input() formData!: GenericFormData;
  @Input() formType!: 'registration' | 'login' | 'recipe';
  @Input() ingredients: Ingredient[] = [];
  @Input() steps: string[] = [];
  @Input() units: string[] = [];

  @Output() formSubmit = new EventEmitter<GenericFormData>();
  @Output() addIngredient = new EventEmitter<Ingredient>();
  @Output() updateIngredients = new EventEmitter<Ingredient[]>();
  @Output() addStep = new EventEmitter<string>();
  @Output() updateSteps = new EventEmitter<string[]>();

  buttonText!: string;
  headingText!: string;
  formModel!: GenericFormModel;

  faBtn = faPlus;
  faSpoon = faSpoon;
  faList = faListOl;

  ngOnInit(): void {
    this.formModel = new GenericFormModel(this.formData);
    this.formModel.form.addControl('ingredients', new FormControl(''));

    this.headingText = this.isRegistrationForm()
      ? 'Sign Up for a Delicious Journey'
      : this.isLoginForm()
      ? "Let's Get Cooking"
      : this.isRecipeCreateForm()
      ? 'Design your recipe'
      : this.isRecipeEditForm()
      ? 'Redesign your recipe'
      : '';

    this.buttonText = this.isRegistrationForm()
      ? 'Sign Up'
      : this.isLoginForm()
      ? 'Sign In'
      : this.isRecipeCreateForm()
      ? 'Create'
      : this.isRecipeEditForm()
      ? 'Edit'
      : '';
  }

  isRegistrationForm(): boolean {
    return this.formType === 'registration';
  }

  isLoginForm(): boolean {
    return this.formType === 'login';
  }

  isRecipeEditForm(): boolean {
    return this.formType === 'recipe';
  }

  isRecipeCreateForm(): boolean {
    return this.formType === 'recipe';
  }

  onAddIngredient(): void {
    const ingredientControl = this.formModel.form.get('ingredient');
    const quantityControl = this.formModel.form.get('quantity');
    const unitControl = this.formModel.form.get('unit');

    if (
      ingredientControl &&
      ingredientControl.value &&
      quantityControl &&
      quantityControl.value &&
      unitControl &&
      unitControl.value
    ) {
      const ingredient = {
        name: ingredientControl.value,
        quantity: quantityControl.value,
        unit: unitControl.value,
      };

      if (
        !this.ingredients.some(
          (ingredient) => ingredient.name !== ingredientControl?.value
        )
      ) {
        this.addIngredient.emit(ingredient);
      }
    }

    ingredientControl?.setValue('');
    quantityControl?.setValue(0);
    unitControl?.setValue('');
  }

  onEditIngredient(ingredient: Ingredient): void {
    const ingredientControl = this.formModel.form.get('ingredient');
    const quantityControl = this.formModel.form.get('quantity');
    const unitControl = this.formModel.form.get('unit');

    this.ingredients = this.ingredients.filter(
      (i) => i.name !== ingredient.name
    );
    this.updateIngredients.emit([...this.ingredients]);

    ingredientControl?.setValue(ingredient.name);
    quantityControl?.setValue(ingredient.quantity);
    unitControl?.setValue(ingredient.unit);
  }

  onAddStep(): void {
    const stepsControl = this.formModel.form.get('steps');

    if (stepsControl && stepsControl.value) {
      this.addStep.emit(stepsControl.value);
      stepsControl.setValue('');
    }
  }

  onEditSteps(item: string): void {
    const stepsControl = this.formModel.form.get('steps');

    this.steps = this.steps.filter((i) => i !== item);
    this.updateSteps.emit([...this.steps]);

    stepsControl?.setValue(item);
  }

  onSubmit(): void {
    this.formSubmit.emit(this.formModel.form.value);
  }
}
