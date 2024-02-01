import { AuthGenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { GenericAuthFormData } from '../../shared/generic-form/generic-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiActions } from '../../store/auth/auth.actions';
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
