import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './user.model';

const getAuthState = createFeatureSelector<AuthState>('auth');

export const getUserData = createSelector(getAuthState, (state) => state.user);
