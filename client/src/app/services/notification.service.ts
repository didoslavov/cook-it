import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification$$ = new BehaviorSubject<Notification>({
    type: '',
    message: '',
  });

  constructor() {}

  getNotification() {
    return this.notification$$.asObservable();
  }

  setNotification(notification: Notification) {
    this.notification$$.next(notification);
  }
}
