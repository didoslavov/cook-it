import { Store } from '@ngrx/store';
import { AuthGenericFormComponent } from '../../shared/auth-generic-form/generic-auth-form.component';
import { GenericAuthFormData } from '../../shared/auth-generic-form/generic-auth-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthGenericFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginData: GenericAuthFormData = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private store: Store) {}

  onSubmit(formData: GenericAuthFormData): void {
    const credentials = { ...formData };
    this.store.dispatch(AuthApiActions.loginUser({ credentials }));

    this.router.navigate(['/']);
  }
}
