import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { AuthApiActions } from '../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store);
  const cookieService = inject(CookieService);

  const modifiedReq = req.clone({
    url: environment.apiUrl + req.url,
    withCredentials: true,
  });

  const isLoginRequest = req.url.includes('/login');

  return next(modifiedReq).pipe(
    catchError((error) => {
      switch (error.status) {
        case 400:
          store.dispatch(
            isLoginRequest
              ? AuthApiActions.loginFailure({ error: error.message })
              : AuthApiActions.registrationFailure({ error: error.message })
          );
          break;
        case 401:
          cookieService.delete('auth');
          store.dispatch(AuthApiActions.logout());
          router.navigate(['/auth/login']);
          return throwError(() => 'Token is expired.');
        case 409:
          store.dispatch(
            AuthApiActions.registrationFailure({ error: error.message })
          );
          break;
      }

      return throwError(() => error.message);
    })
  );
};
