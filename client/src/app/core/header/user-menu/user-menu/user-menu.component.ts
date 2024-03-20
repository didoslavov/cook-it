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
import { AuthApiActions } from '../../../../store/auth/auth.actions';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../../../store/auth/auth.selectors';
import { NotificationService } from '../../../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @Input() logout!: Function;
  @ViewChild('menu') menu!: ElementRef;

  userDataSubscription: Subscription = new Subscription();

  declare userId: string | null;
  declare faUser;
  declare faLogout;

  constructor(private store: Store) {
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

  ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
  }
}
