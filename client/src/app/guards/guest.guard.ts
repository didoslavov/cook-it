import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../store/auth/auth.selectors';
import { NotificationService } from '../services/notification.service';
import { map, take } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const notificationService = inject(NotificationService);

  return store.pipe(select(getUserData), take(1)).pipe(
    map((userData) => {
      if (userData) {
        notificationService.setNotification({
          message: "You're already signed.",
          type: 'error',
        });
        router.navigate(['']);
        return false;
      } else {
        return true;
      }
    })
  );
};
