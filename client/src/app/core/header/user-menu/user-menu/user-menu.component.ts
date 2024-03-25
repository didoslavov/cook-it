import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../../../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { AuthApiActions } from '../../../../store/auth/auth.actions';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menu') menu!: ElementRef;

  userDataSubscription: Subscription = new Subscription();

  declare userId: string | null;
  declare faUser;
  declare faLogout;

  constructor(
    private store: Store,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.faUser = faUser;
    this.faLogout = faRightFromBracket;
  }

  ngOnInit(): void {
    this.userDataSubscription = this.store
      .pipe(select(getUserData))
      .subscribe((user: any) => {
        this.userId = user?.user?.id;
      });
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
  }

  onLogout() {
    this.notificationService.setNotification({
      message: 'Logged out successfully',
      type: 'success',
    });

    this.store.dispatch(AuthApiActions.logout());

    this.router.navigate(['/']);
  }
}
