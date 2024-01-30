import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthApiActions } from '../../../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  @ViewChild('menu') menu!: ElementRef;

  constructor(private store: Store, private router: Router) {}

  faUser = faUser;
  faLogout = faRightFromBracket;

  logout() {
    this.store.dispatch(AuthApiActions.logout());

    this.router.navigate(['/']);
  }
}
