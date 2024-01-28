import { AuthGenericFormComponent } from '../../shared/auth-generic-form/generic-auth-form.component';
import { GenericAuthFormData } from '../../shared/auth-generic-form/generic-auth-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onFormSubmit(): void {
    // this.router.navigate(['/dashboard']);
  }
}
