import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../store/auth/auth.selectors';
import { map, switchMap, take } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { RecipeService } from '../services/recipe.service';
import { inject } from '@angular/core';

export const ownerGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const notificationService = inject(NotificationService);
  const recipeService = inject(RecipeService);
  const router = inject(Router);

  return store.pipe(
    select(getUserData),
    take(1),
    map((userData) => userData?.id),
    switchMap((userId) => {
      const recipeId = route.params['recipeId'];

      return recipeService.getRecipeById(recipeId).pipe(
        map((recipe) => {
          const ownerId = recipe?.userId;

          if (userId !== ownerId) {
            notificationService.setNotification({
              message: "You don't have access to this resource.",
              type: 'error',
            });

            router.navigate([`/recipes/${recipeId}/details`]);

            return false;
          }

          return userId === ownerId;
        })
      );
    })
  );
};
