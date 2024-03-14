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
import { slideInOut } from '../../animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [slideInOut],
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;
  private notificationSubscription: Subscription | null = null;
  private notificationTimer: Subscription | null = null;
  private delayTimer: Subscription | null = null;
  isHovered = false;

  declare faXmark;
  declare faExclamation;
  declare faCheck;

  constructor(private notificationService: NotificationService) {
    this.faXmark = faXmark;
    this.faExclamation = faExclamation;
    this.faCheck = faCheck;
  }

  ngOnInit() {
    this.delayTimer = timer(1000).subscribe(() => {
      this.subscribeToNotificationService();
    });
  }

  ngOnDestroy() {
    this.clearNotificationTimer();
    this.clearDelayTimer();
    this.notificationSubscription?.unsubscribe();
    this.clearNotification();
  }

  onMouseEnter() {
    this.isHovered = true;
    this.clearNotificationTimer();
  }

  onMouseLeave() {
    this.isHovered = false;
    if (this.notification) {
      this.startNotificationTimer();
    }
  }

  private subscribeToNotificationService() {
    this.notificationSubscription = this.notificationService
      .getNotification()
      .subscribe({
        next: (notification) => {
          this.notification = notification;

          if (this.notification) {
            this.startNotificationTimer();
          }
        },
      });
  }

  private startNotificationTimer() {
    this.notificationTimer = timer(4000).subscribe(() => {
      this.clearNotification();
    });
  }

  private clearNotificationTimer() {
    if (this.notificationTimer) {
      this.notificationTimer.unsubscribe();
      this.notificationTimer = null;
    }
  }

  private clearDelayTimer() {
    if (this.delayTimer) {
      this.delayTimer.unsubscribe();
      this.delayTimer = null;
    }
  }

  clearNotification() {
    this.notification = null;
    this.notificationService.clearNotification();
    this.clearNotificationTimer();
  }
}
