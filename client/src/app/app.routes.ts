import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './user/login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeFormComponent } from './recipes/create-recipe-form/create-recipe-form.component';
import { DetailsComponent } from './recipes/details/details.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'create-recipe',
    component: RecipeFormComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'recipes/:recipeId/details',
    component: DetailsComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    data: { animation: 'isRight' },
  },
];
