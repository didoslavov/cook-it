import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, User } from '../store/auth/user.model';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiActions } from '../store/auth/auth.actions';
import { GenericFormData } from '../shared/generic-form/generic-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private cookieService: CookieService,
    private store: Store,
    private http: HttpClient
  ) {}

  extractTokenFromCookie(): string | null {
    const token = this.cookieService.get('auth');
    return token || null;
  }

  register(userData: GenericFormData): Observable<User> {
    return this.http
      .post<User>('/users/register', userData)
      .pipe(
        tap((user) =>
          this.store.dispatch(AuthApiActions.registrationSuccess({ user }))
        )
      );
  }

  login(credentials: Credentials): Observable<User> {
    return this.http
      .post<User>('/users/login', credentials)
      .pipe(
        tap((user) =>
          this.store.dispatch(AuthApiActions.loginSuccess({ user }))
        )
      );
  }

  logout(): Observable<Object> {
    return this.http.post('/users/logout', null);
  }
}
