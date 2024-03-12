import { Store } from '@ngrx/store';
import { GenericFormComponent } from '../../../shared/generic-form/generic-form.component';
import { GenericFormData } from '../../../shared/generic-form/generic-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiActions } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginData: GenericFormData = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private store: Store) {}

  onSubmit(formData: GenericFormData): void {
    const credentials = { ...formData };
    this.store.dispatch(AuthApiActions.loginUser({ credentials }));

    this.router.navigate(['/']);
  }
}
