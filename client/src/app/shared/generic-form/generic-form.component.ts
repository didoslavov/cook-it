import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GenericFormData, GenericFormModel } from './generic-form.model';
import { RouterLink } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
  @Input() ingredients: string[] = [];
  @Input() steps: string[] = [];

  @Output() formSubmit = new EventEmitter<GenericFormData>();
  @Output() addIngredient = new EventEmitter<string>();
  @Output() updateIngredients = new EventEmitter<string[]>();
  @Output() addStep = new EventEmitter<string>();
  @Output() updateSteps = new EventEmitter<string[]>();

  buttonText!: string;
  headingText!: string;
  formModel!: GenericFormModel;

  faBtn = faPlus;

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
    const ingredientsControl = this.formModel.form.get('ingredients');

    if (ingredientsControl && ingredientsControl.value) {
      const ingredient = ingredientsControl.value;

      if (!this.ingredients.includes(ingredient)) {
        this.addIngredient.emit(ingredient);
      }

      ingredientsControl.setValue('');
    }
  }

  onEditIngredient(item: string): void {
    const ingredientsControl = this.formModel.form.get('ingredients');

    this.ingredients = this.ingredients.filter((i) => i !== item);
    this.updateIngredients.emit([...this.ingredients]);

    ingredientsControl?.setValue(item);
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
