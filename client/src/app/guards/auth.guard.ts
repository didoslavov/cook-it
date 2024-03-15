import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../store/auth/auth.selectors';
import { NotificationService } from '../services/notification.service';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const notificationService = inject(NotificationService);

  const userId = route.params['userId'];

  return store.pipe(
    select(getUserData),
    take(1),
    map((userData: any) => userData?.user),
    tap((user) => {
      if (!user) {
        notificationService.setNotification({
          message: "You don't have access to this resource. Please sign in.",
          type: 'error',
        });
        router.navigate(['/auth/login']);
      }

      if (userId && user?.id !== userId) {
        router.navigate(['/']);
      }
    }),
    map((user) => !!user)
  );
};
