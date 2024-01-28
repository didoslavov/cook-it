import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthApiActions } from './auth.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthenticationService,
    private actions$: Actions,
    private router: Router
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.registerUser),
      switchMap(({ userData }) =>
        this.authService.register(userData).pipe(
          map((user) => AuthApiActions.registrationSuccess({ user })),
          catchError((error) =>
            of(AuthApiActions.registrationFailure({ error }))
          )
        )
      )
    )
  );
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.loginUser),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((user) => AuthApiActions.loginSuccess({ user })),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    )
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          catchError((error) => of(AuthApiActions.logoutFailure({ error })))
        )
      )
    )
  );
}
