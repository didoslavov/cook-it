import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Error {
  required: boolean;
  isEmail: boolean;
  isImage: boolean;
  minLength: string;
  maxLength: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errors: { [inputName: string]: { [errorKey: string]: any } } = {};
  private errorsSubject: BehaviorSubject<{
    [inputName: string]: { [errorKey: string]: any };
  }> = new BehaviorSubject<{
    [inputName: string]: { [errorKey: string]: any };
  }>(this.errors);
  public errors$: Observable<{
    [inputName: string]: { [errorKey: string]: any };
  }> = this.errorsSubject.asObservable();

  constructor() {}

  public setErrors(inputName: string, errors: { [errorKey: string]: any }) {
    this.errors[inputName] = errors;
    this.errorsSubject.next(this.errors);
  }

  public clearErrors(inputName: string) {
    delete this.errors[inputName];
    this.errorsSubject.next(this.errors);
  }

  public hasErrors(inputName: string): boolean {
    return !!this.errors[inputName];
  }

  public getErrors(inputName: string): { [errorKey: string]: any } {
    return this.errors[inputName] || {};
  }
}
