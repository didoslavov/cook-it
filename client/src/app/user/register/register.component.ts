import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { GenericFormData } from '../../shared/generic-form/generic-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiActions } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registrationData: GenericFormData = {
    firstName: '',
    lastName: '',
    avatar: '',
    email: '',
    password: '',
    rePassword: '',
  };

  constructor(private store: Store, private router: Router) {}

  onSubmit(formData: GenericFormData): void {
    this.store.dispatch(AuthApiActions.registerUser({ userData: formData }));

    this.router.navigate(['/']);
  }
}
