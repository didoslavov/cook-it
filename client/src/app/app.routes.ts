import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { ownerGuard } from './guards/owner.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./recipes/recipes.component').then((m) => m.RecipesComponent),
  },
  {
    path: 'recipes/create',
    loadComponent: () =>
      import('./recipes/create-recipe-form/create-recipe-form.component').then(
        (m) => m.RecipeFormComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'recipes/:recipeId/details',
    loadComponent: () =>
      import('./recipes/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },
  {
    path: 'recipes/:recipeId/delete',
    loadComponent: () =>
      import('./shared/delete/delete.component').then((m) => m.DeleteComponent),
    canActivate: [authGuard, ownerGuard],
  },
  {
    path: 'recipes/:recipeId/edit',
    loadComponent: () =>
      import('./recipes/edit-recipe-form/edit-recipe-form.component').then(
        (m) => m.EditRecipeFormComponent
      ),
    canActivate: [authGuard, ownerGuard],
  },
  {
    path: 'profile/:userId',
    loadComponent: () =>
      import('./user/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import(
            './user/profile/profile-recipes/profile-recipes.component'
          ).then((m) => m.ProfileRecipesComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./user/profile/profile-search/profile-search.component').then(
            (m) => m.ProfileSearchComponent
          ),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./user/profile/news/news.component').then(
            (m) => m.NewsComponent
          ),
      },
      {
        path: 'liked',
        loadComponent: () =>
          import('./user/profile/liked/liked.component').then(
            (m) => m.LikedComponent
          ),
      },
      {
        path: 'bookmarked',
        loadComponent: () =>
          import('./user/profile/bookmarked/bookmarked.component').then(
            (m) => m.BookmarkedComponent
          ),
      },
    ],
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./user/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./user/login/login.component').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
