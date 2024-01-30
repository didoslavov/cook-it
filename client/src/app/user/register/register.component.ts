import { AuthGenericFormComponent } from '../../shared/auth-generic-form/generic-auth-form.component';
import { GenericAuthFormData } from '../../shared/auth-generic-form/generic-auth-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiActions, AuthPageActions } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthGenericFormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registrationData: GenericAuthFormData = {
    firstName: '',
    lastName: '',
    avatar: '',
    email: '',
    password: '',
    rePassword: '',
  };

  constructor(private store: Store, private router: Router) {}

  onSubmit(formData: GenericAuthFormData): void {
    const userData = { ...formData };
    this.store.dispatch(AuthApiActions.registerUser({ userData }));

    this.router.navigate(['/']);
  }
}
