// local-storage.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthApiActions } from '../store/auth/auth.actions';
import { User } from '../store/auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private store: Store) {}

  loadStateFromLocalStorage() {
    const storedUserData = this.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      this.store.dispatch(AuthApiActions.loginSuccess({ user }));
    }
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, data: User): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
