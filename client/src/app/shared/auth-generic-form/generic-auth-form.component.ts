import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GenericAuthFormData,
  GenericAuthFormModel,
} from './generic-auth-form.model';

@Component({
  selector: 'app-auth-generic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generic-auth-form.component.html',
  styleUrl: './generic-auth-form.component.scss',
})
export class AuthGenericFormComponent implements OnInit {
  @Input() formData!: GenericAuthFormData;
  @Input() formType: 'registration' | 'login' = 'registration';

  formModel!: GenericAuthFormModel;

  ngOnInit(): void {
    this.formModel = new GenericAuthFormModel(this.formData);
  }

  isRegistrationForm(): boolean {
    return this.formType === 'registration';
  }

  isLoginForm(): boolean {
    return this.formType === 'login';
  }
}
