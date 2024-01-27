import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GenericAuthFormData,
  GenericAuthFormModel,
} from './generic-auth-form.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './generic-auth-form.component.html',
  styleUrl: './generic-auth-form.component.scss',
})
export class AuthGenericFormComponent implements OnInit {
  @Input() formData!: GenericAuthFormData;
  @Input() formType!: 'registration' | 'login';
  @Output() formSubmit = new EventEmitter<GenericAuthFormData>();
  buttonText!: string;

  formModel!: GenericAuthFormModel;

  ngOnInit(): void {
    this.formModel = new GenericAuthFormModel(this.formData);
    this.buttonText = this.isRegistrationForm() ? 'Sign Up' : 'Sign In';
  }

  isRegistrationForm(): boolean {
    return this.formType === 'registration';
  }

  isLoginForm(): boolean {
    return this.formType === 'login';
  }

  onSubmit(): void {
    this.formSubmit.emit(this.formModel.form.value);
  }
}
