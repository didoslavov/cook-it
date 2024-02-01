import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './user/login/login.component';
import { RecipesComponent } from './recipes/recipes.component';

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
    path: 'recipes',
    component: RecipesComponent,
    data: { animation: 'isLeft' },
  },
];
