import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthApiActions } from '../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../services/loading.service';
import {
  Notification,
  NotificationService,
} from '../services/notification.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store);
  const cookieService = inject(CookieService);
  const loadingService = inject(LoadingService);
  const notificationService = inject(NotificationService);

  if (req.url.startsWith(environment.newsApiUrl)) {
    return next(req).pipe(
      finalize(() => loadingService.setLoadingState(false))
    );
  }

  if (req.url.startsWith(environment.supabaseUrl)) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${environment.supabaseApiKey}`,
      },
    });

    return next(modifiedReq).pipe(
      finalize(() => {
        loadingService.setLoadingState(false);
      })
    );
  }

  if (req.url.includes('like') || req.url.includes('bookmark')) {
    loadingService.setLoadingState(false);
  } else {
    loadingService.setLoadingState(true);
  }

  const modifiedReq = req.clone({
    url: environment.apiUrl + req.url,
    withCredentials: true,
  });

  const isLoginRequest = req.url.includes('/login');
  const isRegisterRequest = req.url.includes('/register');
  const currentUrl = router.routerState.snapshot.url;

  return next(modifiedReq).pipe(
    catchError((error) => {
      let notificationError: Notification | null = null;

      switch (error.status) {
        case 400:
          store.dispatch(
            isLoginRequest
              ? AuthApiActions.loginFailure({ error: error.message })
              : AuthApiActions.registrationFailure({ error: error.message })
          );

          if (isLoginRequest || isRegisterRequest) {
            notificationError = {
              message: isRegisterRequest
                ? 'Registration failed!'
                : "User or password don't match!",
              type: 'error',
            };

            router.navigate([currentUrl]);
          } else {
            notificationError = {
              message: 'Resource not found.',
              type: 'error',
            };

            router.navigate(['/no-content']);
          }
          break;
        case 401:
          cookieService.delete('auth');
          store.dispatch(AuthApiActions.logout());

          notificationError = {
            message: 'Session is expired, please sign in again.',
            type: 'error',
          };

          router.navigate(['/auth/login']);

          return throwError(() => 'Token is expired.');
        case 404:
          notificationError = {
            message: error.message,
            type: 'error',
          };

          return throwError(() => error.message);
        case 409:
          notificationError = {
            message: error.message,
            type: 'error',
          };

          store.dispatch(
            AuthApiActions.registrationFailure({ error: error.message })
          );
          break;
      }

      notificationService.setNotification(notificationError);

      return throwError(() => error.message);
    }),
    finalize(() => loadingService.setLoadingState(false))
  );
};
