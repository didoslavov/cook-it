import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'isLeft' },
  },
];
