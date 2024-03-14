import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../store/auth/auth.selectors';
import { NotificationService } from '../services/notification.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const notificationService = inject(NotificationService);

  let user;

  store.pipe(select(getUserData)).subscribe((userData: any) => {
    if (userData) {
      notificationService.setNotification({
        message: "You're already signed.",
        type: 'error',
      });
      router.navigate(['']);
    }
  });

  return !user;
};
