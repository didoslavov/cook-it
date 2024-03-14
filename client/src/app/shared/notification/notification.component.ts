import { Component, OnInit } from '@angular/core';
import {
  Notification,
  NotificationService,
} from '../../services/notification.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;
  private notificationSubscription: Subscription | null = null;
  private notificationTimer: Subscription | null = null;

  declare faXmark;
  declare faExclamation;
  declare faCheck;

  constructor(private notificationService: NotificationService) {
    this.faXmark = faXmark;
    this.faExclamation = faExclamation;
    this.faCheck = faCheck;
  }

  ngOnInit() {
    this.notificationService.getNotification().subscribe({
      next: (notification) => {
        this.notification = notification;

        if (this.notification) {
          this.notificationTimer = timer(10000).subscribe(() => {
            this.clearNotification();
          });
        }
      },
    });
  }

  ngOnDestroy() {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }

    if (this.notificationTimer) {
      this.notificationTimer.unsubscribe();
    }

    this.clearNotification();
  }

  clearNotification() {
    this.notificationService.clearNotification();
  }
}
