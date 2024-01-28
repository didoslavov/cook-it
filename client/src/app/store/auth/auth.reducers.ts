import { Action, State, createReducer, on } from '@ngrx/store';
import { AuthState } from './user.model';
import { AuthApiActions, AuthPageActions } from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = createReducer(
  initialState,
  on(AuthApiActions.registerUser, (state) => state),
  on(AuthApiActions.registrationSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),
  on(AuthApiActions.registrationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthApiActions.loginUser, (state) => state),
  on(AuthApiActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),
  on(AuthApiActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthPageActions.registerClicked, (state) => state),
  on(AuthPageActions.loginClicked, (state) => state),
  on(AuthApiActions.logout, () => initialState),
  on(AuthApiActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error: null,
  })),
  on(AuthApiActions.logoutFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: AuthState, action: Action): AuthState {
  return authReducer(state, action);
}
