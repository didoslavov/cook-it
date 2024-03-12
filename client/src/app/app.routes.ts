import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/user/register/register.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeFormComponent } from './pages/recipes/create-recipe-form/create-recipe-form.component';
import { DetailsComponent } from './pages/recipes/details/details.component';
import { EditRecipeFormComponent } from './pages/recipes/edit-recipe-form/edit-recipe-form.component';
import { DeleteComponent } from './shared/delete/delete.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ProfileRecipesComponent } from './pages/user/profile/profile-recipes/profile-recipes.component';
import { ProfileSearchComponent } from './pages/user/profile/profile-search/profile-search.component';
import { NewsComponent } from './pages/user/profile/news/news.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

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
    canActivate: [guestGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    data: { animation: 'isRight' },
    canActivate: [guestGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: { animation: 'isLeft' },
  },
];
