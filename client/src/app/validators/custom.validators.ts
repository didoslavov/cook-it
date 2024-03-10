import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export function imageUrlValidator(
  control: AbstractControl
): Observable<{ [key: string]: boolean } | null> {
  const http = inject(HttpClient);
  const url = control.value;

  if (!url) {
    return of(null);
  }

  return http.head(url, { observe: 'response' }).pipe(
    map((response: any) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('image')) {
        return null;
      } else {
        return { invalidImageUrl: true };
      }
    }),
    catchError(() => of({ invalidImageUrl: true }))
  );
}

export function matchPassword(control: AbstractControl) {
  const password = control.root.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { mismatch: true };
}

export function isNumber(control: AbstractControl) {
  const value = control.value;

  return isNaN(value) ? { isNotNumber: true } : null;
}
