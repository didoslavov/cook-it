import { CanActivateFn } from '@angular/router';

export const ownerGuard: CanActivateFn = (route, state) => {
  return true;
};
