import { AuthGenericFormComponent } from '../shared/auth-generic-form/generic-auth-form.component';
import { GenericAuthFormData } from '../shared/auth-generic-form/generic-auth-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthGenericFormComponent],
  template: `<app-auth-generic-form
    [formType]="'registration'"
    [formData]="registrationData"
    (formSubmit)="onFormSubmit()"
  ></app-auth-generic-form>`,
})
export class RegisterComponent {
  registrationData: GenericAuthFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  };

  constructor(private router: Router) {}

  onFormSubmit(): void {
    //
    // this.router.navigate(['/dashboard']);
  }
}
