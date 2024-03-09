import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {}

  setLoadingState(state: boolean) {
    this.isLoadingSubject.next(state);
  }

  getLoadingState() {
    return this.isLoadingSubject;
  }
}
