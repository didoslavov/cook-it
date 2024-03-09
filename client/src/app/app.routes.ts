import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './user/login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeFormComponent } from './recipes/create-recipe-form/create-recipe-form.component';
import { DetailsComponent } from './recipes/details/details.component';
import { EditRecipeFormComponent } from './recipes/edit-recipe-form/edit-recipe-form.component';
import { DeleteComponent } from './shared/delete/delete.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileRecipesComponent } from './user/profile/profile-recipes/profile-recipes.component';
import { ProfileSearchComponent } from './user/profile/profile-search/profile-search.component';
import { NewsComponent } from './user/profile/news/news.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'recipes/create',
    component: RecipeFormComponent,
    data: { animation: 'isLeft' },
    canActivate: [authGuard],
  },
  {
    path: 'recipes/:recipeId/details',
    component: DetailsComponent,
    data: { animation: 'isLeft' },
  },
  {
    path: 'recipes/:recipeId/delete',
    component: DeleteComponent,
    data: { animation: 'isRight' },
    canActivate: [authGuard],
  },
  {
    path: 'recipes/:recipeId/edit',
    component: EditRecipeFormComponent,
    data: { animation: 'isRight' },
    canActivate: [authGuard],
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'recipes',
        component: ProfileRecipesComponent,
      },
      {
        path: 'search',
        component: ProfileSearchComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
    ],
    data: { animation: 'isRight' },
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
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'isLeft' },
  },
];
