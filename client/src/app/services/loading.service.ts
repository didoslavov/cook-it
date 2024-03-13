import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  setLoadingState(state: boolean) {
    this.isLoading$$.next(state);
  }

  getLoadingState() {
    return this.isLoading$$;
  }
}
