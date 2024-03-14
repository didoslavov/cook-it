import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errors: { [inputName: string]: { [errorKey: string]: any } } = {};

  private errors$$: BehaviorSubject<{
    [inputName: string]: { [errorKey: string]: any };
  }> = new BehaviorSubject<{
    [inputName: string]: { [errorKey: string]: any };
  }>(this.errors);

  public errors$: Observable<{
    [inputName: string]: { [errorKey: string]: any };
  }> = this.errors$$.asObservable();

  constructor() {}

  public setErrors(inputName: string, errors: { [errorKey: string]: any }) {
    this.errors[inputName] = errors;
    this.errors$$.next(this.errors);
  }

  public clearErrors(inputName: string) {
    delete this.errors[inputName];
    this.errors$$.next(this.errors);
  }

  public hasErrors(inputName: string): boolean {
    return !!this.errors[inputName];
  }

  public getErrors(inputName: string): { [errorKey: string]: any } {
    return this.errors[inputName] || {};
  }
}
