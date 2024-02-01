import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericFormData, GenericFormModel } from './generic-form.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit {
  @Input() formData!: GenericFormData;
  @Input() formType!: 'registration' | 'login' | 'recipe';
  @Output() formSubmit = new EventEmitter<GenericFormData>();
  buttonText!: string;
  headingText!: string;

  formModel!: GenericFormModel;

  ngOnInit(): void {
    this.formModel = new GenericFormModel(this.formData);
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

  onSubmit(): void {
    this.formSubmit.emit(this.formModel.form.value);
  }
}
