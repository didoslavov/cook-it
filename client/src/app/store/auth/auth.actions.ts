import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Credentials, User } from './user.model';
import { GenericFormData } from '../../shared/generic-form/generic-form.model';

export const AuthPageActions = createActionGroup({
  source: 'Auth Page',
  events: {
    registerClicked: emptyProps(),
    loginClicked: emptyProps(),
    loadStateFromLocalStorage: emptyProps(),
    loadStateFromLocalStorageSuccess: emptyProps(),
  },
});

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    registerUser: props<{ userData: GenericFormData }>(),
    registrationSuccess: props<{ user: User }>(),
    registrationFailure: props<{ error: string }>(),
    loginUser: props<{ credentials: Credentials }>(),
    loginSuccess: props<{ user: User }>(),
    loginFailure: props<{ error: string }>(),
    logout: emptyProps(),
    logoutSuccess: emptyProps(),
    logoutFailure: props<{ error: string }>(),
  },
});
