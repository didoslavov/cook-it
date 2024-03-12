import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthApiActions, AuthPageActions } from './auth.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { LocalStorageService } from '../../services/storage.service';
import { Store, select } from '@ngrx/store';
import { getUserData } from './auth.selectors';
import { AuthState } from './user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthenticationService,
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store<AuthState>
  ) {}

  loadStateFromLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.loadStateFromLocalStorage),
      withLatestFrom(this.store.pipe(select(getUserData))),
      switchMap(([action, userData]) => {
        const storedUserData = this.localStorageService.getItem('userData');

        if (!userData && storedUserData) {
          const user = JSON.parse(storedUserData);
          this.store.dispatch(AuthApiActions.loginSuccess({ user }));
        }

        return of({ type: 'NO_ACTION' });
      })
    )
  );

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

  registrationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.registrationSuccess),
        tap(({ user }) => {
          this.localStorageService.setItem('userData', user);
        })
      ),
    { dispatch: false }
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

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(({ user }) => {
          this.localStorageService.setItem('userData', user);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthApiActions.logoutSuccess()),
          catchError((error) => of(AuthApiActions.logoutFailure({ error }))),
          tap(() => {
            this.localStorageService.removeItem('userData');
          })
        )
      )
    )
  );
}
