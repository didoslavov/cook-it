import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  const userId = route.params['userId'];
  let user;

  store.pipe(select(getUserData)).subscribe((user: any) => {
    user = user?.user;

    if (!user) {
      router.navigate(['/auth/login']);
    }

    if (userId && user.id !== userId) {
      router.navigate(['/']);
    }
  });

  return !user;
};
