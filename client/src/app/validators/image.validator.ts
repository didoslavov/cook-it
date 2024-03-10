import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ImageUrlValidator implements AsyncValidator {
  static http: HttpClient;

  constructor(private http: HttpClient) {
    ImageUrlValidator.http = http;
  }

  static validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return ImageUrlValidator.validateImgUrl(control.value);
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return ImageUrlValidator.validateImgUrl(control.value);
  }

  private static validateImgUrl(
    url: string
  ): Observable<ValidationErrors | null> {
    return ImageUrlValidator.http.head(url, { observe: 'response' }).pipe(
      map((response: any) => {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image')) {
          return null;
        } else {
          return { invalidAvatarUrl: true };
        }
      }),
      catchError(() => of({ invalidAvatarUrl: true }))
    );
  }
}
