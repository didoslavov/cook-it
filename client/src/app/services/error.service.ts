import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorsSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public errors$: Observable<string[]> = this.errorsSubject.asObservable();

  constructor() {}

  public setErrors(errors: string[]) {
    this.errorsSubject.next(errors);
  }

  public clearError(error: string) {
    const currentErrors = this.errorsSubject.getValue();
    const updatedErrors = currentErrors.filter((e) => e !== error);
    this.errorsSubject.next(updatedErrors);
  }
}
