import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials, User, UserData } from './user.model';

export const AuthPageActions = createActionGroup({
  source: 'Auth Page',
  events: {
    registerClicked: emptyProps(),
    loginClicked: emptyProps(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    registerUser: props<{ userData: UserData }>(),
    registrationSuccess: props<{ user: User }>(),
    registrationFailure: props<{ error: string }>(),
    loginUser: props<{ credentials: Credentials }>(),
    loginSuccess: props<{ user: User }>(),
    loginFailure: props<{ error: string }>(),
    logout: emptyProps(),
  },
});
