import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../store/auth/auth.selectors';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  let user;

  store.pipe(select(getUserData)).subscribe((user: any) => {
    user = user.user;
    if (user) {
      router.navigate(['']);
    }
  });

  return !user;
};
